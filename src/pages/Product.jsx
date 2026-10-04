import { BrainCircuit, Instagram, Languages, MapPin, MessageCircleHeart, Search, Sparkles, Volume2 } from 'lucide-react';
import Button from '../components/Button.jsx';
import { productFeatures } from '../data/services.js';
import { useLanguage } from '../i18n.jsx';

const hanavoyaUrl = 'https://lovable.dev/preview/YL0o7LzqBK57FdmZAsyVV6G0he0m3ezH';
const hanavoyaInstagram = 'https://www.instagram.com/hanavoya/';

function Badge({ children }) { return <span className="status-badge">{children}</span>; }

function HanaVoyaPreview() {
  const { t } = useLanguage();
  return (
    <div className="product-preview">
      <div className="preview-title"><h3>{t('Explore Stockholm')}</h3><Badge>{t('BETA / PREVIEW')}</Badge></div>
      <div className="preview-search"><Search size={16} /><span>{t('Search events, food and hidden places')}</span></div>
      <div className="route-map is-compact">
        <svg viewBox="0 0 480 300" role="img" aria-label={t('Animated Stockholm discovery route')}>
          <path className="map-grid" d="M0 54H480M0 112H480M0 170H480M0 228H480M72 0V300M154 0V300M236 0V300M318 0V300M400 0V300" />
          <path className="water-line" d="M-12 240C86 208 80 125 170 136S272 232 330 180 386 68 500 58" />
          <path className="route-line" d="M72 230C120 182 145 206 190 151S265 118 315 91 374 112 418 55" />
          <circle className="route-point-light" cx="72" cy="230" r="8" /><circle className="route-point-blue" cx="315" cy="91" r="9" /><circle className="route-point-light" cx="418" cy="55" r="8" />
        </svg>
        <span className="map-label label-one"><MapPin size={11} /> Södermalm</span><span className="map-label label-two"><MapPin size={11} /> Djurgården</span>
      </div>
      <div className="filter-row"><span className="active">{t('Today')}</span><span>{t('Free')}</span><span>{t('Culture')}</span><span>{t('Food')}</span></div>
    </div>
  );
}

export default function Product({ id }) {
  const { t } = useLanguage();
  return (
    <section id={id} className="content-section product-section section-light">
      <div className="shell">
        <div className="section-heading light reveal">
          <div><p className="eyebrow blue">{t('PRODUCTS BY HANATECH')}</p><h2>{t('Two products. Two distinct purposes.')}</h2></div>
          <p>{t('HanaMood supports everyday wellbeing through conversation. HanaVoya helps people discover Stockholm in their own language.')}</p>
        </div>
        <div className="products-grid product-detail-cards">
          <article className="product-card reveal">
            <div className="product-card-copy">
              <div className="product-card-top"><span className="product-icon"><BrainCircuit /></span><Badge>{t('PRODUCT VISION')}</Badge></div>
              <p className="product-owner">{t('A HANATECH PRODUCT')}</p><h3>HanaMood</h3>
              <p>{t('A mood-aware conversational AI companion that understands context and offers practical, personalized support for routines, food, drinks, activities, focus and everyday wellbeing.')}</p>
              <div className="product-features compact-features">
                <span><MessageCircleHeart />{t('Natural, human-like conversation')}</span><span><Languages />{t('Multilingual communication')}</span><span><Sparkles />{t('Mood and context-aware guidance')}</span>
              </div>
              <div className="feature-cloud">{productFeatures.map((feature) => <span key={feature}>{t(feature)}</span>)}</div>
              <Button href="#contact" variant="light">{t('Discuss HanaMood')}</Button>
            </div>
            <div className="hanaai-preview" aria-label={t('HanaMood conversational product preview')}>
              <div className="ai-preview-head"><span><BrainCircuit /> HanaMood</span><i>{t('Mood-aware companion')}</i></div>
              <div className="chat-bubble ai">{t('You sound a bit tired today. Want a lighter routine?')}</div>
              <div className="chat-bubble user">{t('Yes, and something calm for this evening.')}</div>
              <div className="chat-bubble ai">{t('Let’s plan a short walk, a simple dinner and one small priority.')}</div>
              <div className="thinking-line"><i /><i /><i /><span>{t('Context, language and mood')}</span></div>
            </div>
          </article>

          <article className="product-card reveal" style={{ '--delay': '100ms' }}>
            <div className="product-card-copy">
              <div className="product-card-top"><a className="product-brand-logo" href={hanavoyaInstagram} target="_blank" rel="noreferrer" aria-label={t('Visit HanaVoya on Instagram')}><img src="/assets/hanavoya-app-icon.png" alt="HanaVoya logo" width="1254" height="1254" /></a><Badge>{t('BETA / PREVIEW')}</Badge></div>
              <p className="product-owner">{t('A HANATECH PRODUCT')}</p><h3>HanaVoya</h3>
              <p>{t('A multilingual discovery product for tourists, immigrants and international residents looking for Stockholm events, culture, food and hidden places.')}</p>
              <div className="product-features compact-features">
                <span><Languages />{t('Nine languages with Persian and Arabic RTL')}</span><span><Search />{t('Search and category filters')}</span><span><Volume2 />{t('Audio, saved favourites and profiles')}</span>
              </div>
              <div className="feature-cloud"><span>{t('Events & places')}</span><span>{t('Map-ready discovery')}</span><span>{t('Profile & interests')}</span><span>{t('Preview content')}</span></div>
              <div className="product-actions"><Button href={hanavoyaUrl} variant="light" external>{t('Explore HanaVoya')}</Button><a className="instagram-link" href={hanavoyaInstagram} target="_blank" rel="noreferrer"><Instagram /> {t('Follow @hanavoya')}</a></div>
            </div>
            <HanaVoyaPreview />
          </article>
        </div>
      </div>
    </section>
  );
}
