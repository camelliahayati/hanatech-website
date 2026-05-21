import { ArrowUpRight, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import {
  aboutHighlights,
  companyRoadmap,
  workflow,
} from '../data/services.js';

export default function About({ id }) {
  return (
    <section id={id} className="page-section bg-pine-950 px-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <SectionHeader
            eyebrow="About"
            title="Stockholm-based AI startup with global technology ambition"
            text="HanaTech is an AI innovation company combining technology strategy, infrastructure depth, and practical product execution for teams building the next generation of digital services."
            tone="dark"
          />
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-pine-200 hover:text-pine-100"
          >
            Start a strategic conversation
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-4">
          {aboutHighlights.map((principle) => (
            <div
              key={principle}
              className="flex gap-4 rounded-[8px] border border-pine-200/10 bg-pine-900/55 p-5"
            >
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-pine-700 text-pine-50">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-lg font-medium leading-7 text-pine-100">
                {principle}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl rounded-[8px] border border-pine-200/10 bg-pine-900/55 p-6 sm:p-8">
        <SectionHeader
          eyebrow="Client Workflow"
          title="How we deliver with your team"
          text="A transparent process that aligns business priorities, technical quality, and delivery velocity."
          tone="dark"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[8px] border border-pine-200/10 bg-pine-950/70 p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine-300">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-pine-50">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-pine-100/75">{step.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl rounded-[8px] border border-pine-200/10 bg-pine-900/55 p-6 shadow-soft sm:p-8">
        <SectionHeader
          eyebrow="Future Roadmap"
          title="Building from consulting excellence toward global AI products"
          text="Our strategic roadmap connects near-term delivery impact with long-term product and international growth."
          tone="dark"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {companyRoadmap.map((item) => (
            <article
              key={item.title}
              className="rounded-[8px] border border-pine-200/10 bg-pine-950/70 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine-300">
                {item.phase}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-pine-50">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-pine-100/75">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
