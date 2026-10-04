import { Check, MapPin, Search } from 'lucide-react';
import { useEffect } from 'react';
import Button from '../components/Button.jsx';

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

const work = [
  { status: 'BETA / PREVIEW', title: 'HanaVoya', summary: 'Multilingual discovery for Stockholm events, places and hidden gems.', meta: '9 languages · RTL · Search · Map · Saved', href: hanavoyaUrl, link: 'Explore product', kind: 'map' },
  { status: 'PROTOTYPE', title: 'PULSE AI', summary: 'AI-assisted document extraction that turns complex PDFs into structured, reviewable data.', meta: 'Document parsing · Structured output · Review workflow', href: '#contact', link: 'Discuss the prototype', kind: 'document' },
];

export default function Home() {
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
      <section id="top" className="hero section-dark">
        <div className="shell hero-grid">
          <div className="hero-copy reveal is-visible">
            <p className="eyebrow"><span /> STOCKHOLM · PRODUCT ENGINEERING · AI</p>
            <h1>Engineering products with a human sense of place.</h1>
            <p className="hero-lead">HanaTech turns ambitious ideas into reliable digital products—combining 16+ years in software engineering with careful product design.</p>
            <div className="hero-actions">
              <Button href={hanavoyaUrl} external>Explore HanaVoya</Button>
              <Button href="#work" variant="dark">See selected work</Button>
            </div>
            <div className="hero-metrics">
              <div><strong>16+ years</strong><span>in software engineering</span></div>
              <div><strong>Stockholm</strong><span>built in Sweden</span></div>
              <div><strong>Product · AI · Web</strong><span>end-to-end delivery</span></div>
            </div>
          </div>
          <div className="reveal reveal-delay"><ProductPreview hero /></div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          {['Senior engineering judgment', 'Multilingual by design', 'Product discipline from idea to release'].map((item) => (
            <div key={item}><span><Check size={14} /></span>{item}</div>
          ))}
        </div>
      </section>

      <section id="hanavoya" className="product-section section-light">
        <div className="shell product-grid">
          <div className="reveal product-visual"><ProductPreview /></div>
          <div className="product-copy reveal reveal-delay">
            <Badge>BETA / PREVIEW</Badge>
            <h2>Discover Stockholm in your own language.</h2>
            <p>HanaVoya helps tourists, immigrants and international residents find events, places and hidden gems—without losing context in translation.</p>
            <ul>
              <li><i />9 languages with complete Persian and Arabic RTL</li>
              <li><i />Search, filters and a map-ready exploration flow</li>
              <li><i />Saved favourites, profiles and browser-based audio guides</li>
            </ul>
            <Button href={hanavoyaUrl} variant="light" external>Explore HanaVoya</Button>
          </div>
        </div>
      </section>

      <section id="about" className="capabilities section-dark">
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
                  {item.kind === 'map' ? <RouteMap compact /> : (
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

      <section id="contact" className="closing-cta section-dark">
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
