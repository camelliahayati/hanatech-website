export default function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <article
      className="group rounded-[8px] border border-pine-200/10 bg-pine-900/50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-pine-300/30 hover:shadow-soft"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-pine-950 text-pine-300 transition duration-300 group-hover:bg-pine-700 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-pine-50">
        {service.title}
      </h3>
      <p className="mt-4 leading-7 text-pine-100/75">{service.text}</p>
      {service.highlights?.length ? (
        <ul className="mt-5 grid gap-2 text-sm text-pine-100/75">
          {service.highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span
                className="mt-2 h-1.5 w-1.5 rounded-full bg-pine-300"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
