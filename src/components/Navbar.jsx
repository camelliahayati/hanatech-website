import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar({ pages }) {
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
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled ? 'bg-mist/90 shadow-sm backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Main navigation"
      >
        <a href="#home" className="flex items-center gap-3" onClick={close}>
          <img
            src="/assets/hanatech-logo-mark.png"
            alt="HanaTech logo"
            width="120"
            height="120"
            decoding="async"
            className="h-10 w-10 rounded-[8px] object-cover mix-blend-multiply sm:h-11 sm:w-11"
          />
          <img
            src="/assets/hanatech-logo-wordmark.png"
            alt=""
            aria-hidden="true"
            width="400"
            height="176"
            decoding="async"
            className="hidden h-9 w-auto object-contain mix-blend-multiply md:block"
          />
          <span className="block text-base font-semibold text-pine-950 md:hidden">
            HanaTech
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {pages.map((page) => (
            <a
              key={page.id}
              href={`#${page.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-white hover:text-pine-800"
            >
              {page.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-pine-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pine-700 md:inline-flex"
        >
          Book a call
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-pine-900/10 bg-white/80 text-pine-950 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="mx-5 mb-4 rounded-2xl border border-pine-900/10 bg-white p-3 shadow-soft md:hidden">
          {pages.map((page) => (
            <a
              key={page.id}
              href={`#${page.id}`}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-pine-50 hover:text-pine-800"
              onClick={close}
            >
              {page.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
