import { BrainCircuit, CloudCog, Code2, Languages, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import Button from '../components/Button.jsx';
import { aiVision, industries, whyHanaTech } from '../data/services.js';
import { useLanguage } from '../i18n.jsx';

function BrandSystemVisual() {
  const { t } = useLanguage();
  return (
    <div className="brand-system" aria-label={t('HanaTech engineering capabilities')}>
      <div className="orbit orbit-one"><i /><i /><i /></div>
      <div className="orbit orbit-two"><i /><i /></div>
      <div className="brand-core">
        <span>{t('BUILT BY')}</span>
        <img src="/assets/hanatech-logo-mark-dark-tight.png" alt="HanaTech icon" width="176" height="176" />
        <strong>HanaTech</strong>
      </div>
      <div className="floating-skill skill-code"><Code2 /><span>{t('Product engineering')}</span></div>
      <div className="floating-skill skill-ai"><BrainCircuit /><span>{t('Applied AI')}</span></div>
      <div className="floating-skill skill-quality"><ShieldCheck /><span>{t('Quality engineering')}</span></div>
      <div className="floating-skill skill-cloud"><CloudCog /><span>{t('Cloud & delivery')}</span></div>
    </div>
  );
}

const trustPoints = [
  { icon: <Code2 size={15} />, label: 'Senior engineering judgment' },
  { icon: <Languages size={15} />, label: 'Multilingual by design' },
  { icon: <ShieldCheck size={15} />, label: 'Product discipline from idea to release' },
];

export default function Home({ id = 'home' }) {
  const { t } = useLanguage();
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
            <p className="eyebrow"><span /> {t('STOCKHOLM · PRODUCT ENGINEERING · AI')}</p>
            <h1>{t('Engineering products with a human sense of place.')}</h1>
            <p className="hero-lead">{t('HanaTech turns ambitious ideas into reliable digital products—combining 16+ years in software engineering with careful product design.')}</p>
            <div className="hero-actions">
              <Button href="#product">{t('Explore our products')}</Button>
              <Button href="#services" variant="dark">{t('Explore our services')}</Button>
            </div>
            <div className="hero-metrics">
              <div><strong>{t('16+ years')}</strong><span>{t('in software engineering')}</span></div>
              <div><strong>{t('Stockholm')}</strong><span>{t('built in Sweden')}</span></div>
              <div><strong>{t('Product · AI · Web')}</strong><span>{t('end-to-end delivery')}</span></div>
            </div>
          </div>
          <div className="reveal reveal-delay"><BrandSystemVisual /></div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          {trustPoints.map(({ icon, label }) => <div key={label}><span>{icon}</span>{t(label)}</div>)}
        </div>
      </section>

      <section className="home-foundations section-dark">
        <div className="shell">
          <div className="section-heading reveal">
            <div><p className="eyebrow coral">{t('WHY HANATECH')}</p><h2>{t('Premium execution for AI and infrastructure transformation.')}</h2></div>
            <p>{t('We connect product goals, architecture and delivery decisions so technology creates measurable business value.')}</p>
          </div>
          <div className="capability-grid">
            {whyHanaTech.map((item, index) => <article className="capability-card reveal" style={{ '--delay': `${index * 90}ms` }} key={item.title}><span>0{index + 1}</span><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}
          </div>
          <div className="foundation-panels">
            <article className="foundation-panel reveal"><p className="eyebrow blue">{t('INDUSTRIES WE HELP')}</p><h3>{t('AI and infrastructure for complex business environments.')}</h3><p>{t('We support scaling companies and enterprise teams across regulated, operationally demanding, and product-intensive industries.')}</p><div className="industry-list">{industries.map((item) => <span key={item}>{t(item)}</span>)}</div></article>
            <article className="foundation-panel reveal reveal-delay"><p className="eyebrow coral">{t('AI VISION')}</p><h3>{t('Human-centered AI with infrastructure-grade reliability.')}</h3><div className="vision-list">{aiVision.map((item) => <p key={item}>{t(item)}</p>)}</div></article>
          </div>
        </div>
      </section>
    </>
  );
}
