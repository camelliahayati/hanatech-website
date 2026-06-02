import { createElement, useEffect, useState } from 'react';
import {
  ArrowRight,
  Brush,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  DoorOpen,
  Hammer,
  Home,
  Mail,
  MapPin,
  Paintbrush,
  Phone,
  Plug,
  Ruler,
  ShieldCheck,
  Sparkles,
  Upload,
  Wrench,
} from 'lucide-react';

const byggCopy = {
  en: {
    nav: ['Home', 'Services', 'Projects', 'About', 'Contact'],
    quote: 'Request Quote',
  },
  sv: {
    nav: ['Hem', 'Tjänster', 'Projekt', 'Om oss', 'Kontakt'],
    quote: 'Begär offert',
  },
};

const services = [
  {
    icon: DoorOpen,
    title: 'Door Installation & Replacement',
    description: 'Interior and exterior door fitting, adjustment, replacement, trim, and finishing.',
  },
  {
    icon: Home,
    title: 'Window Installation & Replacement',
    description: 'Careful window replacement and installation with weather-conscious detailing.',
  },
  {
    icon: Ruler,
    title: 'Parquet & Flooring',
    description: 'Parquet, wood flooring, subfloor preparation, thresholds, and precise finishing.',
  },
  {
    icon: Hammer,
    title: 'Professional Carpentry',
    description: 'Custom carpentry, framing, trims, shelving, repairs, and detail work for homes and businesses.',
  },
  {
    icon: Paintbrush,
    title: 'Painting & Finishing',
    description: 'Interior painting, surface preparation, touch-ups, and polished finishing work.',
  },
  {
    icon: Wrench,
    title: 'Plumbing Services',
    description: 'Coordinated plumbing support for renovations, maintenance, and installation projects.',
  },
  {
    icon: Plug,
    title: 'Electrical Work',
    description: 'Electrical project coordination for safe, compliant installation and renovation work.',
  },
  {
    icon: Building2,
    title: 'Renovation Projects',
    description: 'Room upgrades, interior renovations, and project-managed improvements from start to finish.',
  },
  {
    icon: Brush,
    title: 'General Building Maintenance',
    description: 'Reliable property maintenance, repairs, adjustments, and ongoing building support.',
  },
];

// Upload future project photos to public/assets/bygg-projects/ and replace
// beforeImage / afterImage below with paths like:
// "/assets/bygg-projects/door-stockholm-before.jpg".
const projects = [
  {
    title: 'Door Replacement',
    description: 'Modern interior door replacement with clean trim and careful adjustment.',
    location: 'Stockholm',
    serviceType: 'Doors',
    beforeImage: '',
    afterImage: '',
  },
  {
    title: 'Window Installation',
    description: 'Window installation prepared for a brighter, better insulated living space.',
    location: 'Solna',
    serviceType: 'Windows',
    beforeImage: '',
    afterImage: '',
  },
  {
    title: 'Parquet Flooring',
    description: 'Floor preparation and parquet installation with warm wood finishing.',
    location: 'Sundbyberg',
    serviceType: 'Flooring',
    beforeImage: '',
    afterImage: '',
  },
  {
    title: 'Interior Renovation',
    description: 'Coordinated interior refresh with carpentry, painting, and finishing details.',
    location: 'Sollentuna',
    serviceType: 'Renovation',
    beforeImage: '',
    afterImage: '',
  },
  {
    title: 'Painting Project',
    description: 'Surface preparation and professional painting for a clean, durable result.',
    location: 'Täby',
    serviceType: 'Painting',
    beforeImage: '',
    afterImage: '',
  },
  {
    title: 'Carpentry Work',
    description: 'Custom carpentry improvements with accurate measurements and tidy completion.',
    location: 'Stockholm',
    serviceType: 'Carpentry',
    beforeImage: '',
    afterImage: '',
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Experienced Team',
    description: 'Skilled professionals with practical experience across building, renovation, and finishing work.',
  },
  {
    icon: CheckCircle2,
    title: 'Reliable Service',
    description: 'Clear communication, tidy work sites, and dependable scheduling for every project.',
  },
  {
    icon: Sparkles,
    title: 'Quality Materials',
    description: 'We focus on durable materials, precise installation, and details that hold up over time.',
  },
  {
    icon: ClipboardCheck,
    title: 'Transparent Pricing',
    description: 'Straightforward quotes, realistic timelines, and no unnecessary surprises.',
  },
];

const processSteps = [
  'Request a Quote',
  'Site Visit & Measurements',
  'Proposal & Timeline',
  'Professional Completion',
];

const coverageAreas = [
  'Stockholm',
  'Solna',
  'Sundbyberg',
  'Sollentuna',
  'Täby',
  'Danderyd',
  'Järfälla',
  'Södertälje',
];

export default function HanaTechBygg() {
  const copy = byggCopy.en;

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content');

    document.title = 'HanaTech Bygg | Building & Renovation Services in Stockholm';
    description?.setAttribute(
      'content',
      'Professional renovation, carpentry, doors, windows, parquet flooring, painting, plumbing and electrical services in Stockholm and nearby areas.',
    );

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.setAttribute('content', previousDescription);
      }
    };
  }, []);

  return (
    <div className="bygg-site">
      <ByggHeader copy={copy} />
      <main>
        <ByggHome />
        <ByggServices />
        <ByggGallery />
        <ByggAbout />
        <ByggContact />
      </main>
    </div>
  );
}

function ByggHeader({ copy }) {
  return (
    <header className="bygg-header">
      <a className="bygg-brand" href="#home" aria-label="HanaTech Bygg home">
        <span>H</span>
        <strong>HanaTech Bygg</strong>
      </a>
      <nav aria-label="HanaTech Bygg navigation">
        {copy.nav.map((item) => (
          <a href={`#${item.toLowerCase().replace(' ', '-')}`} key={item}>
            {item}
          </a>
        ))}
        <a className="bygg-nav-cta" href="#request-quote">{copy.quote}</a>
      </nav>
    </header>
  );
}

export function ByggHome() {
  return (
    <section className="bygg-hero" id="home">
      <img
        src="/assets/hanatech-bygg-hero.png"
        alt="Professional renovation and carpentry work in a modern Stockholm home"
        width="1641"
        height="959"
        decoding="async"
        fetchPriority="high"
      />
      <div className="bygg-hero-overlay" />
      <div className="bygg-hero-content">
        <p className="bygg-eyebrow">HanaTech Bygg</p>
        <h1>Professional Building & Renovation Services in Stockholm</h1>
        <p>
          From doors and windows to flooring, carpentry, painting, plumbing,
          electrical work and renovation projects — HanaTech Bygg delivers
          reliable craftsmanship for homes and businesses.
        </p>
        <div className="bygg-hero-actions">
          <a className="bygg-primary-button" href="#request-quote">
            Request Free Quote <ArrowRight size={18} />
          </a>
          <a className="bygg-secondary-button" href="tel:+46700000000">
            <Phone size={18} /> Call Now
          </a>
        </div>
      </div>
    </section>
  );
}

export function ByggServices() {
  return (
    <section className="bygg-section" id="services">
      <div className="bygg-section-heading">
        <p className="bygg-eyebrow">Services</p>
        <h2>Building services for practical, lasting results</h2>
        <p>
          Choose focused craftsmanship for individual upgrades or coordinated
          renovation support across several trades.
        </p>
      </div>
      <div className="bygg-card-grid">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ description, icon: Icon, title }) {
  return (
    <article className="bygg-service-card">
      <span className="bygg-card-icon">{createElement(Icon, { size: 22 })}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#request-quote">Learn more <ArrowRight size={16} /></a>
    </article>
  );
}

export function ByggGallery() {
  return (
    <section className="bygg-section bygg-gallery-section" id="projects">
      <div className="bygg-section-heading">
        <p className="bygg-eyebrow">Projects / Gallery</p>
        <h2>Before and after gallery placeholders</h2>
        <p>
          These project cards are ready for real photos when you want to add
          completed work examples.
        </p>
      </div>
      <div className="bygg-project-grid">
        {projects.map((project) => (
          <ProjectCard key={`${project.title}-${project.location}`} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="bygg-project-card">
      <div className="bygg-before-after">
        <ProjectImage label="Before Image" src={project.beforeImage} />
        <ProjectImage label="After Image" src={project.afterImage} />
      </div>
      <div className="bygg-project-body">
        <span>{project.serviceType}</span>
        <h3>{project.title} — {project.location}</h3>
        <p>{project.description}</p>
        <small><MapPin size={14} /> {project.location}</small>
      </div>
    </article>
  );
}

function ProjectImage({ label, src }) {
  if (src) {
    return <img src={src} alt={label} loading="lazy" />;
  }

  return (
    <div className="bygg-image-placeholder">
      <Upload size={22} />
      <span>{label}</span>
    </div>
  );
}

export function ByggAbout() {
  return (
    <>
      <section className="bygg-section bygg-benefits" id="about">
        <div className="bygg-section-heading">
          <p className="bygg-eyebrow">Why Choose Us</p>
          <h2>Reliable building support with a professional finish</h2>
        </div>
        <div className="bygg-card-grid bygg-benefit-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article className="bygg-benefit-card" key={benefit.title}>
                <span className="bygg-card-icon">{createElement(Icon, { size: 22 })}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bygg-section bygg-process">
        <div className="bygg-section-heading">
          <p className="bygg-eyebrow">Process</p>
          <h2>From first request to completed work</h2>
        </div>
        <div className="bygg-process-grid">
          {processSteps.map((step, index) => (
            <article className="bygg-process-step" key={step}>
              <span>{index + 1}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="bygg-section bygg-coverage">
        <div>
          <p className="bygg-eyebrow">Coverage Area</p>
          <h2>Serving Stockholm and nearby areas</h2>
        </div>
        <div className="bygg-area-list">
          {coverageAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>
    </>
  );
}

export function ByggContact() {
  return (
    <section className="bygg-section bygg-contact" id="contact">
      <div className="bygg-contact-panel">
        <div>
          <p className="bygg-eyebrow">Contact</p>
          <h2>Tell us about your project</h2>
          <p>
            Share your city, service need, and a short description. Photos help
            us understand the scope before a site visit.
          </p>
          <div className="bygg-contact-links">
            <a href="tel:+46700000000"><Phone size={18} /> +46 70 000 00 00</a>
            <a href="mailto:bygg@hanatech.se"><Mail size={18} /> bygg@hanatech.se</a>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  function submitQuote(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="bygg-quote-form" id="request-quote" onSubmit={submitQuote}>
      <label>
        <span>Full Name</span>
        <input name="fullName" type="text" autoComplete="name" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label>
        <span>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        <span>City / Area</span>
        <input name="city" type="text" autoComplete="address-level2" />
      </label>
      <label>
        <span>Service Needed</span>
        <select name="serviceNeeded" defaultValue="">
          <option value="" disabled>Select a service</option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>{service.title}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Preferred Contact Method</span>
        <select name="preferredContact" defaultValue="Phone">
          <option>Phone</option>
          <option>Email</option>
          <option>SMS</option>
        </select>
      </label>
      <label className="bygg-full-span">
        <span>Project Description</span>
        <textarea name="projectDescription" rows="5" />
      </label>
      <label className="bygg-upload-field bygg-full-span">
        <span>Upload Photos</span>
        {/* TODO: Connect this file input to backend storage when quote submission backend is added. */}
        <input name="projectPhotos" type="file" accept="image/*" multiple />
      </label>
      {submitted && (
        <p className="bygg-form-note bygg-full-span">
          Thank you. Your quote request is ready for backend submission integration.
        </p>
      )}
      <button className="bygg-primary-button bygg-full-span" type="submit">
        Submit Request <ArrowRight size={18} />
      </button>
    </form>
  );
}
