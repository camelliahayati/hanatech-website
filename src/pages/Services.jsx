import { services, technologyStack } from '../data/services.js';
import { createElement } from 'react';

export default function Services({ id }) {
  return (
    <section id={id} className="content-section services-section section-light">
      <div className="shell">
        <div className="section-heading light reveal">
          <div><p className="eyebrow blue">SERVICES</p><h2>Enterprise technology offerings built for scale.</h2></div>
          <p>Applied AI, infrastructure and engineering services that strengthen operational stability while accelerating innovation.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => {
            const icon = createElement(service.icon, { 'aria-hidden': true });
            return (
              <article className="service-studio-card reveal" style={{ '--delay': `${(index % 3) * 70}ms` }} key={service.title}>
                <div className="service-icon">{icon}</div>
                <h3>{service.title}</h3><p>{service.text}</p>
                <ul>{service.highlights.map((item) => <li key={item}><i />{item}</li>)}</ul>
              </article>
            );
          })}
        </div>
        <div className="technology-panel reveal">
          <div><p className="eyebrow coral">TECHNOLOGY STACK</p><h3>Modern tools, pragmatic implementation.</h3><p>Trusted open-source technologies and cloud-native patterns for secure, maintainable systems.</p></div>
          <div className="technology-list">{technologyStack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </div>
    </section>
  );
}
