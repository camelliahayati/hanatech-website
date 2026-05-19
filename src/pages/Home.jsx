import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../components/Button.jsx';
import { metrics } from '../data/services.js';

export default function Home({ id }) {
  return (
    <section
      id={id}
      className="relative isolate overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-28 lg:pt-40"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(178,222,196,0.7),transparent_28%),linear-gradient(135deg,#f5f8f4_0%,#eef8f2_48%,#d7efe0_100%)]" />
      <div className="absolute right-0 top-16 -z-10 h-80 w-80 rounded-full bg-pine-200/50 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-pine-700/15 bg-white/70 px-4 py-2 text-sm font-medium text-pine-800 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Strategic engineering for modern teams
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] text-pine-950 sm:text-6xl lg:text-7xl">
            HanaTech
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-650">
            Premium technology consulting for companies that want practical AI,
            resilient cloud platforms, strong backend systems, and calmer
            delivery.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">Start a conversation</Button>
            <Button href="#services" variant="secondary">
              Explore services
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-3xl font-semibold text-pine-900">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up lg:pl-8">
          <div className="rounded-[8px] border border-white/70 bg-white/70 p-3 shadow-soft backdrop-blur">
            <div className="rounded-[8px] bg-pine-950 p-6 text-white sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-pine-200">
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
                    className="flex gap-3 rounded-[8px] bg-white/[0.06] p-4"
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
                    discovery to first production path
                  </p>
                </div>
                <div className="rounded-[8px] bg-pine-800 p-5">
                  <p className="text-3xl font-semibold">24/7</p>
                  <p className="mt-2 text-sm text-pine-100/75">
                    systems thinking for resilient services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
