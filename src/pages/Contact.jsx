import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const contactItems = [
  { icon: Mail, label: 'Email', value: 'hello@hanatech.com' },
  { icon: Phone, label: 'Phone', value: '+46 8 123 456 78' },
  { icon: MapPin, label: 'Based in', value: 'Stockholm, Sweden' },
];

export default function Contact({ id }) {
  return (
    <section id={id} className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Let’s shape the next technical move"
            text="Tell us where your product, platform, or team is headed. We will help turn the situation into a clear, focused path forward."
          />
          <div className="mt-10 grid gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex gap-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-pine-100 text-pine-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-pine-900">
                      {item.label}
                    </p>
                    <p className="mt-1 text-stone-600">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
