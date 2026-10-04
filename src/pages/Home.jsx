import { BrainCircuit, CloudCog, Code2, Languages, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import Button from '../components/Button.jsx';
import { aiVision, industries, whyHanaTech } from '../data/services.js';

function BrandSystemVisual() {
  return (
    <div className="brand-system" aria-label="HanaTech engineering capabilities">
      <div className="orbit orbit-one"><i /><i /><i /></div>
      <div className="orbit orbit-two"><i /><i /></div>
      <div className="brand-core">
        <span>BUILT BY</span>
        <img src="/assets/hanatech-logo-mark-dark-tight.png" alt="HanaTech icon" width="176" height="176" />
        <strong>HanaTech</strong>
      </div>
      <div className="floating-skill skill-code"><Code2 /><span>Product<br />engineering</span></div>
      <div className="floating-skill skill-ai"><BrainCircuit /><span>Applied<br />AI</span></div>
      <div className="floating-skill skill-quality"><ShieldCheck /><span>Quality<br />engineering</span></div>
      <div className="floating-skill skill-cloud"><CloudCog /><span>Cloud &amp;<br />delivery</span></div>
    </div>
  );
}

const trustPoints = [
  { icon: <Code2 size={15} />, label: 'Senior engineering judgment' },
  { icon: <Languages size={15} />, label: 'Multilingual by design' },
  { icon: <ShieldCheck size={15} />, label: 'Product discipline from idea to release' },
];

export default function Home({ id = 'home' }) {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id={id} className="hero section-dark">
        <div className="shell hero-grid">
          <div className="hero-copy reveal is-visible">
            <p className="eyebrow"><span /> STOCKHOLM · PRODUCT ENGINEERING · AI</p>
            <h1>Engineering products with a human sense of place.</h1>
            <p className="hero-lead">HanaTech turns ambitious ideas into reliable digital products—combining 16+ years in software engineering with careful product design.</p>
            <div className="hero-actions">
              <Button href="#product">Explore our products</Button>
              <Button href="#services" variant="dark">Explore our services</Button>
            </div>
            <div className="hero-metrics">
              <div><strong>16+ years</strong><span>in software engineering</span></div>
              <div><strong>Stockholm</strong><span>built in Sweden</span></div>
              <div><strong>Product · AI · Web</strong><span>end-to-end delivery</span></div>
            </div>
          </div>
          <div className="reveal reveal-delay"><BrandSystemVisual /></div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          {trustPoints.map(({ icon, label }) => <div key={label}><span>{icon}</span>{label}</div>)}
        </div>
      </section>

      <section className="home-foundations section-dark">
        <div className="shell">
          <div className="section-heading reveal">
            <div><p className="eyebrow coral">WHY HANATECH</p><h2>Premium execution for AI and infrastructure transformation.</h2></div>
            <p>We connect product goals, architecture and delivery decisions so technology creates measurable business value.</p>
          </div>
          <div className="capability-grid">
            {whyHanaTech.map((item, index) => <article className="capability-card reveal" style={{ '--delay': `${index * 90}ms` }} key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
          <div className="foundation-panels">
            <article className="foundation-panel reveal"><p className="eyebrow blue">INDUSTRIES WE HELP</p><h3>AI and infrastructure for complex business environments.</h3><p>We support scaling companies and enterprise teams across regulated, operationally demanding, and product-intensive industries.</p><div className="industry-list">{industries.map((item) => <span key={item}>{item}</span>)}</div></article>
            <article className="foundation-panel reveal reveal-delay"><p className="eyebrow coral">AI VISION</p><h3>Human-centered AI with infrastructure-grade reliability.</h3><div className="vision-list">{aiVision.map((item) => <p key={item}>{item}</p>)}</div></article>
          </div>
        </div>
      </section>
    </>
  );
}
