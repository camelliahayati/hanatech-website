import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar({ pages, ctaLabel }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed left-0 top-0 z-[9999] w-full border-b border-t-0 border-pine-200/10 bg-[linear-gradient(118deg,rgba(3,25,15,0.96),rgba(10,53,34,0.93),rgba(3,25,15,0.96))] backdrop-blur-xl transition duration-300 ${
        scrolled ? 'shadow-soft' : 'shadow-[0_10px_34px_rgba(2,16,10,0.28)]'
      }`}
    >
      <div className="pointer-events-none absolute inset-x-14 top-0 -z-10 h-14 rounded-full bg-pine-500/20 blur-2xl" />
      <nav
        className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 sm:px-9"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="flex items-center overflow-hidden border-0 bg-transparent py-1"
          onClick={close}
        >
          <span className="block overflow-hidden border-0 bg-transparent">
            <img
              src="/assets/hanatech-logo-navbar-clean.png"
              alt="HanaTech logo"
              width="260"
              height="108"
              decoding="async"
              className="block h-12 w-auto border-0 bg-transparent object-contain shadow-none sm:h-14"
              style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </span>
        </a>

        <div className="hidden items-center justify-center gap-2 md:flex">
          {pages.map((page) => (
            <a
              key={page.id}
              href={`#${page.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-pine-100/85 transition duration-300 hover:-translate-y-0.5 hover:bg-pine-800 hover:text-white"
            >
              {page.label}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-end">
          <a
            href="#contact"
            className="hidden rounded-full bg-pine-700 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-pine-600 md:inline-flex"
          >
            {ctaLabel}
          </a>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-pine-300/20 bg-pine-900/80 text-pine-100 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mx-5 mb-4 rounded-2xl border border-pine-300/20 bg-pine-950 p-3 shadow-soft md:hidden">
          {pages.map((page) => (
            <a
              key={page.id}
              href={`#${page.id}`}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-pine-100/85 hover:bg-pine-900 hover:text-white"
              onClick={close}
            >
              {page.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-3 inline-flex w-full justify-center rounded-full bg-pine-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pine-600"
            onClick={close}
          >
            {ctaLabel}
          </a>
        </div>
      ) : null}
    </header>
  );
}
