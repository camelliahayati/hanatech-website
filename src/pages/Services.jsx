import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { services, technologyStack } from '../data/services.js';

export default function Services({ id }) {
  return (
    <section id={id} className="page-section bg-pine-950 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Services"
          title="Enterprise technology offerings built for scale"
          text="HanaTech delivers applied AI, infrastructure, and engineering services that strengthen operational stability while accelerating innovation."
          align="center"
          tone="dark"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <div className="mt-16 rounded-[8px] border border-pine-200/10 bg-pine-900/55 p-6 shadow-soft sm:p-8">
          <SectionHeader
            eyebrow="Technology Stack"
            title="Modern tools, pragmatic implementation"
            text="Our delivery teams combine trusted open-source technologies and cloud-native patterns to build secure, maintainable systems."
            tone="dark"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {technologyStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-pine-200/20 bg-pine-950/70 px-4 py-2 text-sm font-semibold text-pine-100"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
