import { useEffect, useState } from 'react';

const BASE = (import.meta.env.VITE_BYGG_SUPABASE_URL || '').replace(/\/$/, '');
const KEY = import.meta.env.VITE_BYGG_SUPABASE_PUBLISHABLE_KEY || '';
const SESSION_KEY = 'hanabygg-portfolio-session';
const configured = Boolean(BASE && KEY);
const headers = (token, json = true) => ({ apikey: KEY, ...(json ? { 'Content-Type': 'application/json' } : {}), { Authorization: 'Bearer ' + (token || KEY) } });
async function request(path, options = {}, token) {
  const response = await fetch(BASE + path, { ...options, headers: { ...headers(token, !(options.body instanceof File)), ...options.headers } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || body.error_description || body.error || 'Request failed');
  return body;
}
function storedSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } }
async function validSession() {
  const session = storedSession();
  if (!session) return null;
  if ((session.expires_at || 0) > Date.now() / 1000 + 90) return session;
  if (!session.refresh_token) return null;
  const fresh = await request('/auth/v1/token?grant_type=refresh_token', { method:'POST', body:JSON.stringify({ refresh_token:session.refresh_token }) });
  const value = { ...fresh, expires_at: Math.floor(Date.now()/1000) + fresh.expires_in };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  return value;
}
async function listProjects() {
  if (!configured) return [];
  return request('/rest/v1/bygg_projects?select=id,title_en,title_sv,description_en,description_sv,location,category,year,photos,slug,created_at&published=eq.true&order=created_at.desc', { headers: { Accept:'application/json' } });
}
export const EXISTING_BYGG_PROJECTS = [
  { slug:'residential-renovation', title_en:'Residential renovation', location:'Stockholm', category:'Renovation' },
  { slug:'dental-clinic-interiors', title_en:'Dental clinic interiors', location:'Solna', category:'Carpentry' },
  { slug:'wooden-doors-windows', title_en:'Wooden Doors & Windows', location:'Stockholm Area', category:'Doors & Windows' },
];

export function usePortfolioProjects() {
  const [items,setItems]=useState([]);
  useEffect(()=>{let active=true;listProjects().then(rows=>{if(active)setItems(rows)}).catch(()=>{});return()=>{active=false}},[]);
  return items;
}

export function ProjectPhotoModal({ project, onClose }) {
  const [active,setActive]=useState(0);
  const photos=project?.photos || [];
  useEffect(()=>{setActive(0)},[project?.slug,project?.id]);
  useEffect(()=>{
    if(!project)return;
    function keys(e){if(e.key==='Escape')onClose();if(e.key==='ArrowRight')setActive(x=>(x+1)%photos.length);if(e.key==='ArrowLeft')setActive(x=>(x-1+photos.length)%photos.length)}
    document.addEventListener('keydown',keys);
    return()=>document.removeEventListener('keydown',keys);
  },[project,onClose,photos.length]);
  if(!project || !photos.length)return null;
  return <div role="presentation" onClick={onClose} style={{position:'fixed',inset:0,zIndex:9999,background:'rgba(0,0,0,.88)',display:'grid',placeItems:'center',padding:18}}>
    <div role="dialog" aria-modal="true" aria-label={project.title_en} onClick={e=>e.stopPropagation()} style={{width:'min(100%,1050px)',color:'white',display:'grid',gap:14}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}><h2 style={{fontSize:20}}>{project.title_en}</h2><button type="button" aria-label="Close gallery" onClick={onClose} style={{padding:10}}>✕</button></div>
      <div style={{display:'flex',gap:10,alignItems:'center',justifyContent:'space-between'}}>
        <button type="button" aria-label="Previous photo" onClick={()=>setActive(x=>(x-1+photos.length)%photos.length)} disabled={photos.length<2}>❮</button>
        <img src={photos[active]} alt={project.title_en+' — photo '+(active+1)} style={{maxHeight:'68vh',maxWidth:'calc(100% - 100px)',width:'auto',objectFit:'contain'}} />
        <button type="button" aria-label="Next photo" onClick={()=>setActive(x=>(x+1)%photos.length)} disabled={photos.length<2}>❯</button>
      </div>
      <div style={{textAlign:'center'}}>{active+1} / {photos.length}</div>
      <div style={{display:'flex',gap:8,overflowX:'auto',justifyContent:'center'}}>{photos.map((photo,i)=><button type="button" key={photo} onClick={()=>setActive(i)} aria-label={'Show photo '+(i+1)} style={{border:i===active?'2px solid white':'2px solid transparent',padding:0,background:'none'}}><img src={photo} alt="" style={{width:75,height:60,objectFit:'cover'}} /></button>)}</div>
    </div>
  </div>;
}
const empty = { slug:'',title_en:'',title_sv:'',description_en:'',description_sv:'',location:'',category:'Carpentry',year:new Date().getFullYear(),photos:[],published:false };
export function PortfolioAdmin() {
  const [session,setSession]=useState(null),[email,setEmail]=useState(''),[password,setPassword]=useState('');
  const [items,setItems]=useState([]),[form,setForm]=useState(empty),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[editing,setEditing]=useState(null);
  useEffect(()=>{validSession().then(setSession).catch(()=>{sessionStorage.removeItem(SESSION_KEY);});},[]);
  async function load(s) { const rows=await request('/rest/v1/bygg_projects?select=*&order=created_at.desc',{headers:{Accept:'application/json'}},s.access_token);setItems(rows); }
  useEffect(()=>{if(session) load(session).catch(e=>setNotice(e.message));},[session]);
  async function login(e) {
    e.preventDefault();setBusy(true);setNotice('');
    try {
      const result=await request('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})});
      const s={...result,expires_at:Math.floor(Date.now()/1000)+result.expires_in};
      sessionStorage.setItem(SESSION_KEY,JSON.stringify(s));setSession(s);setPassword('');
    } catch(e){setNotice(e.message)} finally{setBusy(false)}
  }
  async function token() { const s=await validSession(); if(!s) throw new Error('Session expired; sign in again');setSession(s);return s.access_token; }
  async function upload(e) {
    const files=Array.from(e.target.files||[]);if(!files.length)return;
    setBusy(true);setNotice('');
    try {
      const access=await token();const urls=[];
      for(const file of files){
        if(!file.type.startsWith('image/') || file.size>8*1024*1024)throw new Error('Only images up to 8 MB each are allowed');
        const clean=file.name.replace(/[^a-zA-Z0-9._-]/g,'_');
        const path=crypto.randomUUID()+'/'+clean;
        const res=await fetch(BASE+'/storage/v1/object/bygg-projects/'+path,{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+access,'Content-Type':file.type,'x-upsert':'false'},body:file});
        if(!res.ok)throw new Error('Photo upload failed: '+(await res.text()).slice(0,120));
        urls.push(BASE+'/storage/v1/object/public/bygg-projects/'+path);
      }
      setForm(v=>({...v,photos:[...v.photos,...urls]}));setNotice(files.length+' photo(s) uploaded');
    }catch(err){setNotice(err.message)}finally{setBusy(false);e.target.value='';}
  }
  async function save(e) {
    e.preventDefault();setBusy(true);setNotice('');
    try {
      const access=await token();
      const data={...form,slug:form.slug || null,year:Number(form.year)||null};
      await request('/rest/v1/bygg_projects'+(editing?'?id=eq.'+encodeURIComponent(editing):(form.slug?'?on_conflict=slug':'')),{method:editing?'PATCH':'POST',headers:{Prefer:!editing&&form.slug?'resolution=merge-duplicates,return=minimal':'return=minimal'},body:JSON.stringify(data)},access);
      await load({access_token:access});setForm(empty);setEditing(null);setNotice('Project saved');
    }catch(err){setNotice(err.message)}finally{setBusy(false)}
  }
  async function remove(id){
    if(!window.confirm('Delete this project? Uploaded photos will remain in storage.'))return;
    setBusy(true);try{const access=await token();await request('/rest/v1/bygg_projects?id=eq.'+encodeURIComponent(id),{method:'DELETE'},access);await load({access_token:access});setNotice('Project deleted')}catch(err){setNotice(err.message)}finally{setBusy(false)}
  }
  function chooseExisting(slug) {
    if(!slug){setEditing(null);setForm(empty);return;}
    const preset=EXISTING_BYGG_PROJECTS.find(p=>p.slug===slug);
    const row=items.find(p=>p.slug===slug);
    if(row){setEditing(row.id);setForm(Object.fromEntries(Object.keys(empty).map(k=>[k,row[k]??empty[k]])));}
    else {setEditing(null);setForm({...empty,...preset,published:true});}
  }
  const field=(key,label,multi=false)=><label style={{display:'grid',gap:5}}>{label}{multi?<textarea rows="3" value={form[key]||''} onChange={e=>setForm(v=>({...v,[key]:e.target.value}))}/>:<input value={form[key]||''} onChange={e=>setForm(v=>({...v,[key]:e.target.value}))}/>}</label>;
  return <main style={{maxWidth:920,margin:'40px auto',padding:24,fontFamily:'system-ui,sans-serif',color:'#1e293b'}}>
    <a href="/">← Hana Bygg</a><h1>Hana Bygg · Portfolio Admin</h1>
    {!configured?<p>Setup required: configure VITE_BYGG_SUPABASE_URL and VITE_BYGG_SUPABASE_PUBLISHABLE_KEY.</p>:
    !session?<form onSubmit={login} style={{display:'grid',gap:14,maxWidth:400}}>
      <label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
      <label>Password<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
      <button disabled={busy}>Sign in</button></form>:
    <>
      <button onClick={()=>{sessionStorage.removeItem(SESSION_KEY);setSession(null)}}>Sign out</button>
      <h2>{editing?'Edit project':'Add photos to an existing project'}</h2>
      <label style={{display:'grid',gap:5}}>Choose an existing website project
        <select value={form.slug||''} onChange={e=>chooseExisting(e.target.value)}>
          <option value="">New project (optional)</option>
          {EXISTING_BYGG_PROJECTS.map(p=><option key={p.slug} value={p.slug}>{p.title_en}</option>)}
        </select>
      </label>
      <form onSubmit={save} style={{display:'grid',gap:14}}>
        {field('title_en','English title *')}{field('title_sv','Swedish title')}
        {field('description_en','English description',true)}{field('description_sv','Swedish description',true)}
        {field('location','Location')}{field('category','Category')}{field('year','Year')}
        <label>Upload photos (max 8 MB per image)<input type="file" accept="image/*" multiple disabled={busy} onChange={upload}/></label>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{form.photos.map(url=><div key={url}><img src={url} alt="" style={{width:100,height:80,objectFit:'cover'}}/><button type="button" onClick={()=>setForm(v=>({...v,photos:v.photos.filter(x=>x!==url)}))}>Remove</button></div>)}</div>
        <label><input type="checkbox" checked={form.published} onChange={e=>setForm(v=>({...v,published:e.target.checked}))}/> Publish on website</label>
        <button disabled={busy||!form.title_en.trim()}>{busy?'Working…':'Save project'}</button>
        {editing&&<button type="button" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel editing</button>}
      </form>
      <h2>Existing projects</h2>
      {items.map(item=><div key={item.id} style={{borderBottom:'1px solid #ddd',padding:'12px 0',display:'flex',gap:14,alignItems:'center'}}>
        {item.photos?.[0]&&<img src={item.photos[0]} alt="" style={{width:70,height:60,objectFit:'cover'}}/>}
        <div style={{flex:1}}><b>{item.title_en}</b><div>{item.published?'Published':'Draft'}</div></div>
        <button onClick={()=>{setEditing(item.id);setForm(Object.fromEntries(Object.keys(empty).map(k=>[k,item[k]??empty[k]])));window.scrollTo(0,0)}}>Edit</button>
        <button onClick={()=>remove(item.id)}>Delete</button>
      </div>)}
    </>}
    {notice&&<p role="status">{notice}</p>}
  </main>;
}
