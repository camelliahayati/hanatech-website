import { ArrowUpRight, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';

const principles = [
  'Simple architecture before clever architecture',
  'Clear ownership, thoughtful automation, visible operations',
  'Practical AI with governance, evaluation, and product sense',
  'Modern delivery habits that respect people and outcomes',
];

export default function About({ id }) {
  return (
    <section id={id} className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="About"
            title="Senior technical guidance with Nordic restraint"
            text="We help companies make high-quality technical decisions without adding noise. Our work blends strategy, architecture, hands-on engineering, and team coaching."
          />
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-pine-800 hover:text-pine-950"
          >
            Discuss your roadmap
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-4">
          {principles.map((principle) => (
            <div
              key={principle}
              className="flex gap-4 rounded-[8px] border border-pine-900/10 bg-mist p-5"
            >
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-pine-700 text-white">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-lg font-medium leading-7 text-pine-950">
                {principle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
