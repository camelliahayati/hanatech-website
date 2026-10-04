import { createElement, useEffect, useState } from 'react';
import {
  Brush, Building2, Check, ClipboardCheck, DoorOpen, Hammer, Home,
  Mail, MapPin, Menu, Paintbrush, Phone, Plug, Ruler, ShieldCheck,
  Sparkles, Wrench, X,
} from 'lucide-react';

const services = [
  { icon: DoorOpen, title: 'Door Installation & Replacement', description: 'Interior and exterior door fitting, adjustment, replacement, trim and finishing.' },
  { icon: Home, title: 'Window Installation & Replacement', description: 'Careful window replacement and installation with weather-conscious detailing.' },
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
  { title: 'Doors & wooden windows', location: 'Stockholm area', text: 'Replacement and adjustment work focused on fit, function, durability and a clean finish.' },
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
  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'Hana Bygg | Building & Renovation in Stockholm';
    return () => { document.title = oldTitle; };
  }, []);

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
  return <a className={`bygg-studio-brand ${compact ? 'compact' : ''}`} href="#home"><img src="/assets/hanabygg-logo.png" alt="Hana Bygg logo" width="700" height="700" /><span><strong>Hana</strong> Bygg</span></a>;
}

function ByggHeader() {
  const [open, setOpen] = useState(false);
  const links = [['Home', '#home'], ['Services', '#services'], ['Projects', '#projects'], ['About', '#about'], ['Contact', '#contact']];
  return (
    <header className="bygg-studio-header"><nav className="bygg-studio-nav"><ByggLogo compact /><div className="bygg-desktop-links">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><a className="nav-cta" href="#quote">Request quote</a><button type="button" className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></nav>{open && <div className="mobile-menu">{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="button button-primary" href="#quote" onClick={() => setOpen(false)}>Request quote</a></div>}</header>
  );
}

function ByggHero() {
  return (
    <section id="home" className="bygg-studio-hero section-dark"><div className="shell bygg-hero-grid"><div className="bygg-hero-copy"><p className="eyebrow coral">STOCKHOLM · BUILDING · RENOVATION</p><h1>Craftsmanship with a clear plan.</h1><p>Professional renovation, carpentry and installation services for homes and businesses across Stockholm.</p><div className="hero-actions"><a className="button button-primary" href="#quote">Request a free quote</a><a className="button button-dark" href="tel:+46766519272"><Phone /> Call +46 76 651 92 72</a></div><div className="bygg-proof"><span>Clear quotations</span><span>Reliable scheduling</span><span>Professional finish</span></div></div><div className="bygg-hero-mark"><div className="bygg-logo-orbit" /><img src="/assets/hanabygg-logo.png" alt="Hana Bygg wooden house mark" width="700" height="700" /><small>A HANA VENTURE</small></div></div></section>
  );
}

function ByggServices() {
  return <section id="services" className="content-section section-light"><div className="shell"><div className="section-heading light"><div><p className="eyebrow blue">SERVICES</p><h2>Building services for practical, lasting results.</h2></div><p>Focused craftsmanship for individual upgrades or coordinated renovation work across several trades.</p></div><div className="services-grid">{services.map((service) => <ByggServiceCard key={service.title} {...service} />)}</div></div></section>;
}

function ByggServiceCard({ icon, title, description }) {
  return <article className="service-studio-card"><div className="service-icon">{createElement(icon, { 'aria-hidden': true })}</div><h3>{title}</h3><p>{description}</p><a className="bygg-card-link" href="#quote">Request this service</a></article>;
}

function ByggProjects() {
  return <section id="projects" className="content-section section-dark"><div className="shell"><div className="section-heading"><div><p className="eyebrow coral">SELECTED WORK</p><h2>Practical work. Honest descriptions.</h2></div><p>Completed and current project categories. Photos can be added as each project portfolio is approved.</p></div><div className="bygg-project-grid">{projects.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div className="bygg-project-icon"><Hammer /></div><small><MapPin />{item.location}</small><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>;
}

function ByggAbout() {
  return <section id="about" className="content-section section-light"><div className="shell"><div className="section-heading light"><div><p className="eyebrow blue">WHY HANA BYGG</p><h2>Reliable work with a professional finish.</h2></div><p>Clear communication and careful execution from the first visit through final completion.</p></div><div className="bygg-benefit-grid">{benefits.map((item) => <article key={item.title}><span>{createElement(item.icon, { 'aria-hidden': true })}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="bygg-process-panel"><div><p className="eyebrow coral">OUR PROCESS</p><h3>From first request to completed work.</h3></div><div className="bygg-process-grid">{process.map((step, index) => <article key={step}><span>0{index + 1}</span><strong>{step}</strong></article>)}</div></div><div className="bygg-coverage"><div><p className="eyebrow blue">COVERAGE</p><h3>Stockholm and nearby areas.</h3></div><div>{coverage.map((area) => <span key={area}>{area}</span>)}</div></div></div></section>;
}

function ByggContact() {
  return <section id="contact" className="content-section section-dark"><div className="shell bygg-contact-grid"><div><p className="eyebrow coral">CONTACT</p><h2>Tell us about your project.</h2><p>Share your area, service need and a short description. Photos help us understand the scope before a site visit.</p><div className="bygg-contact-links"><a href="tel:+46766519272"><Phone />+46 76 651 92 72</a><a href="mailto:camelliahayati@hanatech.se"><Mail />camelliahayati@hanatech.se</a></div></div><QuoteForm /></div></section>;
}

function QuoteForm() {
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
  return <form id="quote" className="bygg-quote-form-new" onSubmit={submit}><input type="hidden" name="subject" value="New Hana Bygg quote request" /><input type="hidden" name="from_name" value="Hana Bygg Website" /><div className="form-row"><label className="contact-field">Full name<input className="studio-field" name="name" required /></label><label className="contact-field">Email<input className="studio-field" type="email" name="email" required /></label></div><div className="form-row"><label className="contact-field">Phone<input className="studio-field" type="tel" name="phone" /></label><label className="contact-field">City / area<input className="studio-field" name="city" /></label></div><label className="contact-field">Service needed<select className="studio-field" name="service" defaultValue="" required><option value="" disabled>Select a service</option>{services.map((item) => <option key={item.title}>{item.title}</option>)}</select></label><label className="contact-field">Project description<textarea className="studio-field studio-textarea" name="message" required /></label><button className="form-submit" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Submit request'}</button>{state === 'success' && <p className="bygg-form-status success">Thank you. Your request was sent successfully.</p>}{state === 'error' && <p className="bygg-form-status error">Unable to send right now. Please email us directly.</p>}</form>;
}

function ByggFooter() {
  return <footer className="studio-footer"><div className="footer-grid shell"><div className="footer-intro"><ByggLogo compact /><p>Building, renovation and carpentry services across Stockholm.</p></div><div className="footer-links"><div><h3>Explore</h3><a href="#services">Services</a><a href="#projects">Projects</a><a href="#about">About</a></div><div><h3>Hana</h3><a href="https://hanatech.se">HanaTech</a><a href="https://www.instagram.com/hanavoya/" target="_blank" rel="noreferrer">HanaVoya</a></div><div><h3>Contact</h3><a href="mailto:camelliahayati@hanatech.se">camelliahayati@hanatech.se</a><a href="tel:+46766519272">+46 76 651 92 72</a></div></div></div><div className="footer-legal shell"><span>© 2026 Hana Bygg. All rights reserved.</span><a href="#home">Back to top</a></div></footer>;
}
