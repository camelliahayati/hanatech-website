export default function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pine-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">
          {text}
        </p>
      ) : null}
    </div>
  );
}
