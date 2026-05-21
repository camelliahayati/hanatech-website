import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../components/Button.jsx';
import { aiVision, industries, metrics, whyHanaTech } from '../data/services.js';

export default function Home({ id }) {
  return (
    <section
      id={id}
      className="relative isolate overflow-hidden px-5 pb-20 pt-8 sm:px-8 sm:pb-28 sm:pt-10 lg:pt-12"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(68,184,107,0.22),transparent_32%),radial-gradient(circle_at_84%_16%,rgba(32,127,69,0.24),transparent_24%),linear-gradient(140deg,#03130d_0%,#052016_46%,#03190f_100%)]" />
      <div className="absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-pine-500/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-pine-200/20 bg-pine-900/65 px-4 py-2 text-sm font-medium text-pine-200 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Strategic engineering for modern teams
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] text-pine-50 sm:text-6xl lg:text-7xl">
            HanaTech
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-pine-100/80">
            A Stockholm AI startup and technology partner for organizations
            building modern products, resilient infrastructure, and
            intelligence-led operations.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">Start a conversation</Button>
            <Button href="#product" variant="secondary">
              Explore HanaAI Platform
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-3xl font-semibold text-pine-100">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-pine-200/70">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up lg:pl-8">
          <div className="rounded-[8px] border border-pine-200/10 bg-pine-950/65 p-3 shadow-soft backdrop-blur">
            <div className="rounded-[8px] bg-pine-950 p-6 text-white sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-pine-300">
                    Operating model
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    From idea to reliable platform
                  </h2>
                </div>
                <ShieldCheck className="h-9 w-9 text-pine-300" />
              </div>
              <div className="mt-8 grid gap-4">
                {[
                  'AI opportunities mapped to measurable business value',
                  'AWS foundations designed for security and scale',
                  'Delivery systems with observability and automation built in',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[8px] bg-white/[0.07] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-pine-300" />
                    <p className="text-sm leading-6 text-pine-50">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-[8px] bg-pine-100 p-5 text-pine-950">
                  <p className="text-3xl font-semibold">6 wks</p>
                  <p className="mt-2 text-sm text-pine-900/75">
                    from discovery to production blueprint
                  </p>
                </div>
                <div className="rounded-[8px] bg-pine-800 p-5">
                  <p className="text-3xl font-semibold">24/7</p>
                  <p className="mt-2 text-sm text-pine-100/75">
                    platform mindset for resilient services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl space-y-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pine-300">
            Why HanaTech
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-pine-50 sm:text-4xl">
            Premium execution for AI and infrastructure transformation
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {whyHanaTech.map((item) => (
            <article
              key={item.title}
              className="rounded-[8px] border border-pine-200/10 bg-pine-900/45 p-6 shadow-sm backdrop-blur"
            >
              <h2 className="text-xl font-semibold text-pine-50">{item.title}</h2>
              <p className="mt-3 leading-7 text-pine-100/75">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-10 rounded-[8px] border border-pine-200/10 bg-pine-950/60 p-6 shadow-soft md:grid-cols-[0.88fr_1.12fr] md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pine-300">
              Industries We Help
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-pine-50">
              AI and infrastructure for complex business environments
            </h2>
            <p className="mt-4 leading-7 text-pine-100/75">
              We support scaling companies and enterprise teams across
              regulated, operationally demanding, and product-intensive
              industries.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-[8px] border border-pine-200/10 bg-pine-900/70 px-4 py-3 text-sm font-semibold text-pine-100"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] bg-pine-950 p-7 text-white shadow-soft sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pine-300">
            AI Vision
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            Human-centered AI with infrastructure-grade reliability
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {aiVision.map((point) => (
              <div key={point} className="rounded-[8px] bg-white/[0.08] p-4">
                <p className="text-sm leading-7 text-pine-100">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
