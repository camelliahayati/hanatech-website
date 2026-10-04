import {
  BrainCircuit,
  CloudCog,
  Code2,
  Languages,
  MapPin,
  MapPinned,
  MessageCircleHeart,
  Search,
  ShieldCheck,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useEffect } from 'react';
import Button from '../components/Button.jsx';
import { aiVision, industries, whyHanaTech } from '../data/services.js';

const hanavoyaUrl = 'https://lovable.dev/preview/YL0o7LzqBK57FdmZAsyVV6G0he0m3ezH';

function RouteMap({ compact = false }) {
  return (
    <div className={`route-map ${compact ? 'is-compact' : ''}`}>
      <svg viewBox="0 0 562 290" role="img" aria-label="A route connecting places across Stockholm">
        <path className="water-line" d="M0 72C101 35 141 96 226 48C318 -4 374 72 464 31C501 14 534 15 562 3" />
        <g className="map-grid"><path d="M70 0V290M171 0V290M281 0V290M391 0V290M501 0V290M0 65H562M0 145H562M0 225H562" /></g>
        <path className="route-line" d="M21 252C94 179 151 226 219 159C277 102 333 148 388 93C432 49 493 76 540 25" />
        <circle className="route-point-light" cx="219" cy="159" r="17" />
        <circle className="route-point-blue" cx="388" cy="93" r="17" />
      </svg>
      <span className="map-label label-one"><MapPin size={14} /> Södermalm</span>
      <span className="map-label label-two"><MapPin size={14} /> Vasastan</span>
    </div>
  );
}

function Badge({ children }) {
  return <span className="status-badge">{children}</span>;
}

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

function ProductPreview({ hero = false }) {
  return (
    <div className={`product-preview ${hero ? 'hero-preview' : ''}`}>
      <div className="preview-title"><h3>HanaVoya</h3><Badge>BETA / PREVIEW</Badge></div>
      {hero ? (
        <div className="preview-search"><Search size={21} /><span>What would you like to do in Stockholm?</span></div>
      ) : (
        <div className="preview-language"><span>Explore Stockholm</span><strong>FA · فارسی</strong></div>
      )}
      <RouteMap compact={hero} />
      {hero ? (
        <div className="mini-events">
          <article><small>TODAY</small><strong>Culture night</strong><span>Free · Södermalm</span></article>
          <article><small>WEEKEND</small><strong>Nordic food walk</strong><span>From 120 SEK</span></article>
        </div>
      ) : (
        <div className="filter-row"><span className="active">Today</span><span>Free</span><span>Culture</span><span>Hidden places</span></div>
      )}
    </div>
  );
}

const capabilities = [
  ['01', 'Product engineering', 'Architecture, frontend systems and dependable delivery shaped by 16+ years in software engineering.'],
  ['02', 'AI-assisted workflows', 'Useful AI for extraction, search and operational tools—with humans kept in control.'],
  ['03', 'Multilingual experiences', 'Accessible interfaces, RTL support and content systems designed for international audiences.'],
];

const trustPoints = [
  { icon: <Code2 size={15} />, label: 'Senior engineering judgment' },
  { icon: <Languages size={15} />, label: 'Multilingual by design' },
  { icon: <ShieldCheck size={15} />, label: 'Product discipline from idea to release' },
];

const work = [
  { status: 'PROTOTYPE', title: 'PULSE AI', summary: 'AI-assisted document extraction that turns complex PDFs into structured, reviewable data.', meta: 'Document parsing · Structured output · Review workflow', href: '#contact', link: 'Discuss the prototype', kind: 'document' },
  { status: 'VALIDATION PLATFORM', title: 'Dental AI Survey', summary: 'A secure research workflow for collecting structured professional feedback on AI-assisted dental diagnostics.', meta: 'FastAPI · Secure admin · Structured research data', href: '/dental-ai-survey', link: 'View platform', kind: 'dental' },
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
              <Button href="#work" variant="dark">See selected work</Button>
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
          {trustPoints.map(({ icon, label }) => (
            <div key={label}><span>{icon}</span>{label}</div>
          ))}
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

      <section id="product-overview" className="product-section section-light">
        <div className="shell">
          <div className="section-heading light reveal">
            <div><p className="eyebrow blue">PRODUCTS BY HANATECH</p><h2>Two products. One engineering standard.</h2></div>
            <p>HanaTech creates focused digital products that make complex technology feel useful, human and clear.</p>
          </div>
          <div className="products-grid">
            <article className="product-card hanaai-card reveal">
              <div className="product-card-copy">
                <div className="product-card-top"><span className="product-icon"><BrainCircuit /></span><Badge>PRODUCT VISION</Badge></div>
                <p className="product-owner">A HANATECH PRODUCT</p>
                <h3>HanaMood</h3>
                <p>A multilingual conversational AI experience designed to understand context, mood and everyday needs.</p>
                <div className="product-features">
                  <span><MessageCircleHeart />Natural conversation</span>
                  <span><Languages />Multilingual by design</span>
                  <span><Sparkles />Context-aware guidance</span>
                </div>
                <Button href="#contact" variant="light">Discuss HanaMood</Button>
              </div>
              <div className="hanaai-preview" aria-label="HanaMood conversational product preview">
                <div className="ai-preview-head"><span><BrainCircuit /> HanaMood</span><i>Mood-aware companion</i></div>
                <div className="chat-bubble ai">How can I make today feel lighter?</div>
                <div className="chat-bubble user">I have two hours and want something calm.</div>
                <div className="chat-bubble ai">Let’s plan a quiet walk, coffee and one small priority.</div>
                <div className="thinking-line"><i /><i /><i /><span>Context, language and mood</span></div>
              </div>
            </article>

            <article className="product-card hanavoya-card reveal" style={{ '--delay': '100ms' }}>
              <div className="product-card-copy">
                <div className="product-card-top"><span className="product-icon coral-icon"><MapPinned /></span><Badge>BETA / PREVIEW</Badge></div>
                <p className="product-owner">A HANATECH PRODUCT</p>
                <h3>HanaVoya</h3>
                <p>Discover Stockholm events, places and hidden gems in your own language—with context that travels.</p>
                <div className="product-features">
                  <span><Languages />9 languages and RTL</span>
                  <span><Search />Search and filters</span>
                  <span><Volume2 />Saved items and audio</span>
                </div>
                <Button href={hanavoyaUrl} variant="light" external>Explore HanaVoya</Button>
              </div>
              <ProductPreview />
            </article>
          </div>
        </div>
      </section>

      <section id="studio-preview" className="capabilities section-dark">
        <div className="shell">
          <div className="section-heading reveal">
            <div><p className="eyebrow coral">HOW HANATECH WORKS</p><h2>Senior engineering, product thinking and restrained design.</h2></div>
            <p>A focused studio for products where quality, clarity and technical judgment matter more than noise.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map(([number, title, text], index) => (
              <article className="capability-card reveal" style={{ '--delay': `${index * 90}ms` }} key={number}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="selected-work section-light">
        <div className="shell">
          <div className="section-heading light reveal">
            <div><p className="eyebrow blue">SELECTED WORK</p><h2>Real products. Honest status. No invented case studies.</h2></div>
            <p>A small portfolio that shows how HanaTech thinks, builds and learns in public.</p>
          </div>
          <div id="ventures" className="work-grid">
            {work.map((item, index) => (
              <article className="work-card reveal" style={{ '--delay': `${index * 100}ms` }} key={item.title}>
                <div className={`work-visual ${item.kind}`}>
                  {item.kind === 'dental' ? (
                    <div className="dental-work-preview"><ShieldCheck /><span>Dental AI Validation</span><strong>Structured professional research</strong><div><i>01</i><i>02</i><i>03</i><i>04</i></div></div>
                  ) : (
                    <div className="document-ui">
                      <div className="document-page"><span /><span /><span /><span /></div>
                      <div className="extraction-panel"><small>EXTRACTED DATA</small><b>Property value</b><strong>4,850,000 SEK</strong><b>Review status</b><em>Human verified</em></div>
                    </div>
                  )}
                </div>
                <div className="work-content">
                  <Badge>{item.status}</Badge><h3>{item.title}</h3><p>{item.summary}</p><small>{item.meta}</small>
                  <a href={item.href} {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{item.link} <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta section-dark">
        <div className="shell reveal">
          <p className="eyebrow coral">A SMALL STUDIO WITH SENIOR DEPTH</p>
          <h2>Build something useful.</h2>
          <p>Thoughtful engineering. A clear path to release.</p>
          <Button href="mailto:camelliahayati@hanatech.se?subject=Let%E2%80%99s%20build%20something%20useful">Start a conversation</Button>
        </div>
      </section>
    </>
  );
}
