import { Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const contactItems = [
  { icon: Mail, label: 'Email', value: 'camelliahayati@hanatech.se' },
  { icon: Phone, label: 'Phone', value: '+46 76 651 92 72' },
  { icon: MapPin, label: 'Based in', value: 'Stockholm, Sweden' },
];

export default function Contact({ id }) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    const normalizedPath = url.pathname.replace(/\/+$/, '');
    const onContactPage = normalizedPath === '/contact';
    const isSuccess = url.searchParams.get('success') === 'true';

    setShowSuccess(onContactPage && isSuccess);

    if (onContactPage) {
      const section = document.getElementById(id);
      if (section) {
        requestAnimationFrame(() => {
          section.scrollIntoView({ block: 'start' });
        });
      }
    }
  }, [id]);

  return (
    <section id={id} className="page-section bg-pine-950 px-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          {showSuccess ? (
            <p
              className="mb-6 rounded-[8px] border border-pine-200/15 bg-pine-950/70 px-4 py-3 text-sm text-pine-100"
              role="status"
              aria-live="polite"
            >
              Thank you. Your inquiry was sent successfully.
            </p>
          ) : null}
          <SectionHeader
            eyebrow="Contact"
            title="Let’s design your next technology advantage"
            text="From AI adoption to infrastructure modernization, we help leadership and engineering teams shape practical, high-impact initiatives."
            tone="dark"
          />
          <div className="mt-10 grid gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex gap-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-pine-900 text-pine-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-pine-100">
                      {item.label}
                    </p>
                    <p className="mt-1 text-pine-100/75">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-[8px] border border-pine-200/10 bg-pine-900/55 p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-300">
              Consultation
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-pine-50">
              Book a strategic 45-minute advisory session
            </h3>
            <p className="mt-3 leading-7 text-pine-100/75">
              Share your priorities in the form and we will follow up with a
              tailored consultation agenda and scheduling options.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
