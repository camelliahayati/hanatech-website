import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm.jsx';
import { useLanguage } from '../i18n.jsx';

const items = [
  { icon: <Mail />, label: 'Email', value: 'info@hanatech.se', href: 'mailto:info@hanatech.se' },
  { icon: <Phone />, label: 'Phone', value: '+46 76 651 92 72', href: 'tel:+46766519272' },
  { icon: <MapPin />, label: 'Based in', value: 'Stockholm, Sweden' },
];

export default function Contact({ id }) {
  const { t } = useLanguage();
  return (
    <section id={id} className="content-section contact-section section-light">
      <div className="shell contact-grid">
        <div className="contact-copy reveal">
          <p className="eyebrow blue">{t('CONTACT')}</p><h2>{t('Let’s design your next technology advantage.')}</h2><p>{t('From AI adoption to infrastructure modernization, we help leadership and engineering teams shape practical, high-impact initiatives.')}</p>
          <div className="contact-items">{items.map((item) => <article key={item.label}><span>{item.icon}</span><div><small>{t(item.label)}</small>{item.href ? <a href={item.href}>{item.value}</a> : <strong>{t(item.value)}</strong>}</div></article>)}</div>
          <div className="consultation-card"><small>{t('CONSULTATION')}</small><h3>{t('Book a strategic 45-minute advisory session.')}</h3><p>{t('Share your priorities and we will follow up with a tailored agenda and scheduling options.')}</p></div>
        </div>
        <div className="reveal reveal-delay"><ContactForm /></div>
      </div>
    </section>
  );
}
