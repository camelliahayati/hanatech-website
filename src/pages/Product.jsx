import { BrainCircuit, Instagram, Languages, MapPin, MessageCircleHeart, Search, Sparkles, Volume2 } from 'lucide-react';
import Button from '../components/Button.jsx';
import { productFeatures } from '../data/services.js';

const hanavoyaUrl = 'https://lovable.dev/preview/YL0o7LzqBK57FdmZAsyVV6G0he0m3ezH';
const hanavoyaInstagram = 'https://www.instagram.com/hanavoya/';

function Badge({ children }) { return <span className="status-badge">{children}</span>; }

function HanaVoyaPreview() {
  return (
    <div className="product-preview">
      <div className="preview-title"><h3>Explore Stockholm</h3><Badge>BETA / PREVIEW</Badge></div>
      <div className="preview-search"><Search size={16} /><span>Search events, food and hidden places</span></div>
      <div className="route-map is-compact">
        <svg viewBox="0 0 480 300" role="img" aria-label="Animated Stockholm discovery route">
          <path className="map-grid" d="M0 54H480M0 112H480M0 170H480M0 228H480M72 0V300M154 0V300M236 0V300M318 0V300M400 0V300" />
          <path className="water-line" d="M-12 240C86 208 80 125 170 136S272 232 330 180 386 68 500 58" />
          <path className="route-line" d="M72 230C120 182 145 206 190 151S265 118 315 91 374 112 418 55" />
          <circle className="route-point-light" cx="72" cy="230" r="8" /><circle className="route-point-blue" cx="315" cy="91" r="9" /><circle className="route-point-light" cx="418" cy="55" r="8" />
        </svg>
        <span className="map-label label-one"><MapPin size={11} /> Södermalm</span><span className="map-label label-two"><MapPin size={11} /> Djurgården</span>
      </div>
      <div className="filter-row"><span className="active">Today</span><span>Free</span><span>Culture</span><span>Food</span></div>
    </div>
  );
}

export default function Product({ id }) {
  return (
    <section id={id} className="content-section product-section section-light">
      <div className="shell">
        <div className="section-heading light reveal">
          <div><p className="eyebrow blue">PRODUCTS BY HANATECH</p><h2>Two products. Two distinct purposes.</h2></div>
          <p>HanaMood supports everyday wellbeing through conversation. HanaVoya helps people discover Stockholm in their own language.</p>
        </div>
        <div className="products-grid product-detail-cards">
          <article className="product-card reveal">
            <div className="product-card-copy">
              <div className="product-card-top"><span className="product-icon"><BrainCircuit /></span><Badge>PRODUCT VISION</Badge></div>
              <p className="product-owner">A HANATECH PRODUCT</p><h3>HanaMood</h3>
              <p>A mood-aware conversational AI companion that understands context and offers practical, personalized support for routines, food, drinks, activities, focus and everyday wellbeing.</p>
              <div className="product-features compact-features">
                <span><MessageCircleHeart />Natural, human-like conversation</span><span><Languages />Multilingual communication</span><span><Sparkles />Mood and context-aware guidance</span>
              </div>
              <div className="feature-cloud">{productFeatures.map((feature) => <span key={feature}>{feature}</span>)}</div>
              <Button href="#contact" variant="light">Discuss HanaMood</Button>
            </div>
            <div className="hanaai-preview" aria-label="HanaMood conversational product preview">
              <div className="ai-preview-head"><span><BrainCircuit /> HanaMood</span><i>Mood-aware companion</i></div>
              <div className="chat-bubble ai">You sound a bit tired today. Want a lighter routine?</div>
              <div className="chat-bubble user">Yes, and something calm for this evening.</div>
              <div className="chat-bubble ai">Let’s plan a short walk, a simple dinner and one small priority.</div>
              <div className="thinking-line"><i /><i /><i /><span>Context, language and mood</span></div>
            </div>
          </article>

          <article className="product-card reveal" style={{ '--delay': '100ms' }}>
            <div className="product-card-copy">
              <div className="product-card-top"><a className="product-brand-logo" href={hanavoyaInstagram} target="_blank" rel="noreferrer" aria-label="Visit HanaVoya on Instagram"><img src="/assets/hanavoya-app-icon.png" alt="HanaVoya logo" width="1254" height="1254" /></a><Badge>BETA / PREVIEW</Badge></div>
              <p className="product-owner">A HANATECH PRODUCT</p><h3>HanaVoya</h3>
              <p>A multilingual discovery product for tourists, immigrants and international residents looking for Stockholm events, culture, food and hidden places.</p>
              <div className="product-features compact-features">
                <span><Languages />Nine languages with Persian and Arabic RTL</span><span><Search />Search and category filters</span><span><Volume2 />Audio, saved favourites and profiles</span>
              </div>
              <div className="feature-cloud"><span>Events &amp; places</span><span>Map-ready discovery</span><span>Profile &amp; interests</span><span>Preview content</span></div>
              <div className="product-actions"><Button href={hanavoyaUrl} variant="light" external>Explore HanaVoya</Button><a className="instagram-link" href={hanavoyaInstagram} target="_blank" rel="noreferrer"><Instagram /> Follow @hanavoya</a></div>
            </div>
            <HanaVoyaPreview />
          </article>
        </div>
      </div>
    </section>
  );
}
