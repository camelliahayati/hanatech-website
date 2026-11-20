-- Run only in a dedicated Hana Bygg Supabase project.
-- Create the administrator in Supabase Auth first, then insert their auth UUID into bygg_admins.
create table if not exists public.bygg_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.bygg_admins enable row level security;
create policy "Admin can see own membership" on public.bygg_admins
for select to authenticated using (user_id = (select auth.uid()));

create table if not exists public.bygg_projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title_en text not null check (length(trim(title_en)) > 0),
  title_sv text not null default '',
  description_en text not null default '',
  description_sv text not null default '',
  location text not null default '',
  category text not null default '',
  year integer,
  photos text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.bygg_projects enable row level security;
create policy "Public sees published projects" on public.bygg_projects
for select to anon using (published = true);
create policy "Admin sees all projects" on public.bygg_projects
for select to authenticated using (exists (select 1 from public.bygg_admins a where a.user_id = (select auth.uid())));
create policy "Admin creates projects" on public.bygg_projects
for insert to authenticated with check (exists (select 1 from public.bygg_admins a where a.user_id = (select auth.uid())));
create policy "Admin edits projects" on public.bygg_projects
for update to authenticated
using (exists (select 1 from public.bygg_admins a where a.user_id = (select auth.uid())))
with check (exists (select 1 from public.bygg_admins a where a.user_id = (select auth.uid())));
create policy "Admin deletes projects" on public.bygg_projects
for delete to authenticated using (exists (select 1 from public.bygg_admins a where a.user_id = (select auth.uid())));

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('bygg-projects','bygg-projects',true,8388608,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do nothing;
create policy "Anyone can view portfolio pictures" on storage.objects for select to anon
using (bucket_id = 'bygg-projects');
create policy "Admin can upload portfolio pictures" on storage.objects for insert to authenticated
with check (bucket_id='bygg-projects' and exists (select 1 from public.bygg_admins a where a.user_id = (select auth.uid())));
create policy "Admin can delete portfolio pictures" on storage.objects for delete to authenticated
using (bucket_id='bygg-projects' and exists (select 1 from public.bygg_admins a where a.user_id = (select auth.uid())));
grant select on public.bygg_projects to anon;
grant select,insert,update,delete on public.bygg_projects to authenticated;
grant select on public.bygg_admins to authenticated;
-- After the auth user exists, add manually:
-- insert into public.bygg_admins(user_id) values ('AUTH-USER-UUID');
