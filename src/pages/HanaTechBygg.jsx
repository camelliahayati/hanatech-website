import { createElement, useEffect, useState } from 'react';
import {
  Brush, Building2, Check, ClipboardCheck, DoorOpen, Hammer,
  Mail, MapPin, Menu, Paintbrush, Phone, Plug, Ruler, ShieldCheck,
  Sparkles, Wrench, X,
} from 'lucide-react';
import { LanguageSwitcher, useLanguage } from '../i18n.jsx';

const services = [
  { icon: DoorOpen, title: 'Wooden Doors & Windows — Installation & Replacement', description: 'Installation, replacement and adjustment of wooden doors and windows, including precise fitting, trims and clean finishing.' },
  { icon: Ruler, title: 'Parquet & Flooring', description: 'Parquet, wood flooring, subfloor preparation, thresholds and precise finishing.' },
  { icon: Hammer, title: 'Professional Carpentry', description: 'Custom carpentry, framing, trims, shelving, repairs and detail work.' },
  { icon: Paintbrush, title: 'Painting & Finishing', description: 'Interior painting, surface preparation, touch-ups and polished finishing work.' },
  { icon: Wrench, title: 'Plumbing Services', description: 'Coordinated plumbing support for renovations, maintenance and installations.' },
  { icon: Plug, title: 'Electrical Work', description: 'Electrical project coordination for safe, compliant renovation work.' },
  { icon: Building2, title: 'Renovation Projects', description: 'Room upgrades and project-managed improvements from start to finish.' },
  { icon: Brush, title: 'Building Maintenance', description: 'Reliable property maintenance, repairs, adjustments and ongoing support.' },
];

const projects = [
  { title: 'Residential renovation', location: 'Stockholm', text: 'Interior renovation and decoration work with coordinated carpentry, finishing and installation.' },
  { title: 'Dental clinic interiors', location: 'Solna', text: 'Custom wooden equipment, cabinets, tables and seating built for a professional environment.' },
  { title: 'Wooden Doors & Windows', location: 'Stockholm Area', text: 'Replacement and adjustment of wooden doors and wooden windows, with precise fitting, reliable function and a clean finish.' },
];

const benefits = [
  { icon: ShieldCheck, title: 'Experienced team', text: 'Practical experience across renovation, carpentry and finishing work.' },
  { icon: Check, title: 'Reliable service', text: 'Clear communication, tidy work sites and dependable scheduling.' },
  { icon: Sparkles, title: 'Quality materials', text: 'Durable materials, precise installation and details that hold up.' },
  { icon: ClipboardCheck, title: 'Transparent pricing', text: 'Straightforward quotes, realistic timelines and no unnecessary surprises.' },
];

const process = ['Request a quote', 'Site visit & measurements', 'Proposal & timeline', 'Professional completion'];
const coverage = ['Stockholm', 'Solna', 'Sundbyberg', 'Sollentuna', 'Täby', 'Danderyd', 'Järfälla', 'Södertälje'];
const FORM_ACTION = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';

export default function HanaTechBygg() {
  const { language } = useLanguage();
  useEffect(() => {
    const oldTitle = document.title;
    document.title = language === 'sv' ? 'Hana Bygg | Bygg & renovering i Stockholm' : 'Hana Bygg | Building & Renovation in Stockholm';
    return () => { document.title = oldTitle; };
  }, [language]);

  return (
    <div className="studio-site bygg-studio-site">
      <ByggHeader />
      <main>
        <ByggHero />
        <ByggServices />
        <ByggProjects />
        <ByggAbout />
        <ByggContact />
      </main>
      <ByggFooter />
    </div>
  );
}

function ByggLogo({ compact = false }) {
  const { t } = useLanguage();
  return <a className={`bygg-studio-brand ${compact ? 'compact' : ''}`} href="#home"><img src="/assets/hanabygg-logo.png" alt={t('Hana Bygg logo')} width="700" height="700" /><span><strong>Hana</strong> Bygg</span></a>;
}

function ByggHeader() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const links = [['Home', '#home'], ['Services', '#services'], ['Projects', '#projects'], ['About', '#about'], ['Contact', '#contact']];
  return (
    <header className="bygg-studio-header"><nav className="bygg-studio-nav"><ByggLogo compact /><div className="bygg-desktop-links">{links.map(([label, href]) => <a href={href} key={href}>{t(label)}</a>)}</div><div className="nav-actions"><LanguageSwitcher /><a className="nav-cta" href="#quote">{t('Request quote')}</a></div><button type="button" className="menu-button" aria-label={t(open ? 'Close navigation' : 'Open navigation')} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></nav>{open && <div className="mobile-menu">{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{t(label)}</a>)}<a className="button button-primary" href="#quote" onClick={() => setOpen(false)}>{t('Request quote')}</a></div>}</header>
  );
}

function ByggHero() {
  const { t } = useLanguage();
  return (
    <section id="home" className="bygg-studio-hero section-dark"><div className="shell bygg-hero-grid"><div className="bygg-hero-copy"><p className="eyebrow coral">{t('STOCKHOLM · BUILDING · RENOVATION')}</p><h1>{t('Craftsmanship with a clear plan.')}</h1><p>{t('Professional renovation, carpentry and installation services for homes and businesses across Stockholm.')}</p><div className="hero-actions"><a className="button button-primary" href="#quote">{t('Request a free quote')}</a><a className="button button-dark" href="tel:+46766519272"><Phone /> {t('Call')} +46 76 651 92 72</a></div><div className="bygg-proof"><span>{t('Clear quotations')}</span><span>{t('Reliable scheduling')}</span><span>{t('Professional finish')}</span></div></div><div className="bygg-hero-visual"><img className="bygg-hero-photo" src="/assets/hanabygg-carpentry.webp" alt={t('Carpenter precisely fitting a wooden window frame in a Stockholm home')} width="1136" height="1026" /><small>{t('PRECISION IN EVERY DETAIL')}</small></div></div></section>
  );
}

function ByggServices() {
  const { t } = useLanguage();
  return <section id="services" className="content-section section-light"><div className="shell"><div className="section-heading light"><div><p className="eyebrow blue">{t('SERVICES')}</p><h2>{t('Building services for practical, lasting results.')}</h2></div><p>{t('Focused craftsmanship for individual upgrades or coordinated renovation work across several trades.')}</p></div><div className="services-grid">{services.map((service) => <ByggServiceCard key={service.title} {...service} />)}</div></div></section>;
}

function ByggServiceCard({ icon, title, description }) {
  const { t } = useLanguage();
  return <article className="service-studio-card"><div className="service-icon">{createElement(icon, { 'aria-hidden': true })}</div><h3>{t(title)}</h3><p>{t(description)}</p><a className="bygg-card-link" href="#quote">{t('Request this service')}</a></article>;
}

function ByggProjects() {
  const { t } = useLanguage();
  return <section id="projects" className="content-section section-dark"><div className="shell"><div className="section-heading"><div><p className="eyebrow coral">{t('SELECTED WORK')}</p><h2>{t('Practical work. Honest descriptions.')}</h2></div><p>{t('A selection of our completed and ongoing projects in renovation, bespoke carpentry, and wooden door and window replacement.')}</p></div><div className="bygg-project-grid">{projects.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div className="bygg-project-icon"><Hammer /></div><small><MapPin />{t(item.location)}</small><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}</div></div></section>;
}

function ByggAbout() {
  const { t } = useLanguage();
  return <section id="about" className="content-section section-light"><div className="shell"><div className="section-heading light"><div><p className="eyebrow blue">{t('WHY HANA BYGG')}</p><h2>{t('Reliable work with a professional finish.')}</h2></div><p>{t('Clear communication and careful execution from the first visit through final completion.')}</p></div><div className="bygg-benefit-grid">{benefits.map((item) => <article key={item.title}><span>{createElement(item.icon, { 'aria-hidden': true })}</span><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}</div><div className="bygg-process-panel"><div><p className="eyebrow coral">{t('OUR PROCESS')}</p><h3>{t('From first request to completed work.')}</h3></div><div className="bygg-process-grid">{process.map((step, index) => <article key={step}><span>0{index + 1}</span><strong>{t(step)}</strong></article>)}</div></div><div className="bygg-coverage"><div><p className="eyebrow blue">{t('COVERAGE')}</p><h3>{t('Stockholm and nearby areas.')}</h3></div><div>{coverage.map((area) => <span key={area}>{area}</span>)}</div></div></div></section>;
}

function ByggContact() {
  const { t } = useLanguage();
  return <section id="contact" className="content-section section-dark"><div className="shell bygg-contact-grid"><div><p className="eyebrow coral">{t('CONTACT')}</p><h2>{t('Tell us about your project.')}</h2><p>{t('Share your area, service need and a short description. Photos help us understand the scope before a site visit.')}</p><div className="bygg-contact-links"><a href="tel:+46766519272"><Phone />+46 76 651 92 72</a><a href="mailto:info@hanatech.se"><Mail />info@hanatech.se</a></div></div><QuoteForm /></div></section>;
}

function QuoteForm() {
  const { t } = useLanguage();
  const [state, setState] = useState('idle');
  async function submit(event) {
    event.preventDefault();
    if (!WEB3FORMS_ACCESS_KEY) { setState('error'); return; }
    setState('sending');
    try {
      const data = new FormData(event.currentTarget); data.set('access_key', WEB3FORMS_ACCESS_KEY);
      const response = await fetch(FORM_ACTION, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Submission failed');
      event.currentTarget.reset(); setState('success');
    } catch { setState('error'); }
  }
  return <form id="quote" className="bygg-quote-form-new" onSubmit={submit}><input type="hidden" name="subject" value="New Hana Bygg quote request" /><input type="hidden" name="from_name" value="Hana Bygg Website" /><div className="form-row"><label className="contact-field">{t('Full name')}<input className="studio-field" name="name" required /></label><label className="contact-field">{t('Email')}<input className="studio-field" type="email" name="email" required /></label></div><div className="form-row"><label className="contact-field">{t('Phone')}<input className="studio-field" type="tel" name="phone" /></label><label className="contact-field">{t('City / area')}<input className="studio-field" name="city" /></label></div><label className="contact-field">{t('Service needed')}<select className="studio-field" name="service" defaultValue="" required><option value="" disabled>{t('Select a service')}</option>{services.map((item) => <option key={item.title} value={item.title}>{t(item.title)}</option>)}</select></label><label className="contact-field">{t('Project description')}<textarea className="studio-field studio-textarea" name="message" required /></label><button className="form-submit" type="submit" disabled={state === 'sending'}>{t(state === 'sending' ? 'Sending…' : 'Submit request')}</button>{state === 'success' && <p className="bygg-form-status success">{t('Thank you. Your request was sent successfully.')}</p>}{state === 'error' && <p className="bygg-form-status error">{t('Unable to send right now. Please email us directly.')}</p>}</form>;
}

function ByggFooter() {
  const { t } = useLanguage();
  return <footer className="studio-footer"><div className="footer-grid shell"><div className="footer-intro"><ByggLogo compact /><p>{t('Building, renovation and carpentry services across Stockholm.')}</p></div><div className="footer-links"><div><h3>{t('Explore')}</h3><a href="#services">{t('Services')}</a><a href="#projects">{t('Projects')}</a><a href="#about">{t('About')}</a></div><div><h3>{t('Contact')}</h3><a href="mailto:info@hanatech.se">info@hanatech.se</a><a href="tel:+46766519272">+46 76 651 92 72</a></div></div></div><div className="footer-legal shell"><span>{t('© 2026 Hana Bygg. All rights reserved.')}</span><a href="#home">{t('Back to top')}</a></div></footer>;
}
