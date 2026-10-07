import { services, technologyStack } from '../data/services.js';
import { createElement } from 'react';
import { useLanguage } from '../i18n.jsx';

export default function Services({ id }) {
  const { t } = useLanguage();
  return (
    <section id={id} className="content-section services-section section-light">
      <div className="shell">
        <div className="section-heading light reveal">
          <div><p className="eyebrow blue">{t('SERVICES')}</p><h2>{t('Enterprise technology offerings built for scale.')}</h2></div>
          <p>{t('Applied AI, infrastructure and engineering services that strengthen operational stability while accelerating innovation.')}</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => {
            const icon = createElement(service.icon, { 'aria-hidden': true });
            return (
              <article className="service-studio-card reveal" style={{ '--delay': `${(index % 3) * 70}ms` }} key={service.title}>
                <div className="service-icon">{icon}</div>
                <h3>{t(service.title)}</h3><p>{t(service.text)}</p>
                <ul>{service.highlights.map((item) => <li key={item}><i />{t(item)}</li>)}</ul>
              </article>
            );
          })}
        </div>
        <div className="technology-panel reveal">
          <div><p className="eyebrow coral">{t('TECHNOLOGY STACK')}</p><h3>{t('Modern tools, pragmatic implementation.')}</h3><p>{t('Trusted open-source technologies and cloud-native patterns for secure, maintainable systems.')}</p></div>
          <div className="technology-list">{technologyStack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </div>
    </section>
  );
}
