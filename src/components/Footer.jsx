import { Mail, Phone } from 'lucide-react';

export default function Footer() {
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
            Premium AI and IT startup focused on cloud infrastructure, backend
            engineering, DevOps, and practical AI innovation.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-200">
            Explore
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-pine-100/70">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#product" className="hover:text-white">HanaAI Platform</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-200">
            Contact
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-pine-100/75">
            <a
              href="mailto:camelliahayati@hanatech.se"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              camelliahayati@hanatech.se
            </a>
            <a
              href="tel:+46766519272"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              +46 76 651 92 72
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-sm text-pine-100/65 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p>© 2026 HanaTech. Stockholm, Sweden.</p>
        <p>Email: camelliahayati@hanatech.se</p>
        <p>Phone: +46 76 651 92 72</p>
      </div>
    </footer>
  );
}
