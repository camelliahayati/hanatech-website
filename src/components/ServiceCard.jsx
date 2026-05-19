export default function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <article
      className="group rounded-[8px] border border-pine-900/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-pine-700/30 hover:shadow-soft"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-pine-50 text-pine-700 transition duration-300 group-hover:bg-pine-700 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-pine-950">
        {service.title}
      </h3>
      <p className="mt-4 leading-7 text-stone-600">{service.text}</p>
    </article>
  );
}
