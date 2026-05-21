export default function SectionHeader({
  eyebrow,
  title,
  text,
  align = 'left',
  tone = 'light',
}) {
  const eyebrowClass =
    tone === 'dark'
      ? 'text-sm font-semibold uppercase tracking-[0.22em] text-pine-300'
      : 'text-sm font-semibold uppercase tracking-[0.22em] text-pine-600';
  const titleClass =
    tone === 'dark'
      ? 'mt-4 text-3xl font-semibold text-pine-50 sm:text-4xl'
      : 'mt-4 text-3xl font-semibold text-ink sm:text-4xl';
  const textClass =
    tone === 'dark'
      ? 'mt-5 text-base leading-8 text-pine-100/75 sm:text-lg'
      : 'mt-5 text-base leading-8 text-stone-600 sm:text-lg';

  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={titleClass}>{title}</h2>
      {text ? <p className={textClass}>{text}</p> : null}
    </div>
  );
}
