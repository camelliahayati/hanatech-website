import { ArrowUpRight, Leaf } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pine-950 px-5 py-12 text-pine-100 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-flex rounded-[10px] bg-white/95 p-2">
            <img
              src="/assets/hanatech-logo-wordmark.png"
              alt="HanaTech logo"
              width="400"
              height="176"
              loading="lazy"
              decoding="async"
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="mt-5 max-w-md leading-7 text-pine-100/70">
            Premium technology consulting for ambitious teams building modern,
            resilient, and intelligent digital products.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-200">
            Explore
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-pine-100/70">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-200">
            Contact
          </h3>
          <a
            href="mailto:hello@hanatech.com"
            className="mt-5 inline-flex items-center gap-2 text-sm text-pine-100/70 hover:text-white"
          >
            hello@hanatech.com
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-pine-100/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} HanaTech. All rights reserved.</p>
        <p className="inline-flex items-center gap-2">
          <Leaf className="h-4 w-4 text-pine-300" />
          Designed with clarity, restraint, and purpose.
        </p>
      </div>
    </footer>
  );
}
