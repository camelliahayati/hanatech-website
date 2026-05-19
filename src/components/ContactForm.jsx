import { Send } from 'lucide-react';

const fieldClass =
  'w-full rounded-[8px] border border-pine-900/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-pine-600 focus:ring-4 focus:ring-pine-100';

export default function ContactForm() {
  return (
    <form className="rounded-[8px] border border-pine-900/10 bg-white p-5 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Name
          <input className={fieldClass} name="name" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Email
          <input
            className={fieldClass}
            type="email"
            name="email"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-medium text-stone-700">
        Company
        <input className={fieldClass} name="company" placeholder="Company name" />
      </label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-stone-700">
        What can we help with?
        <select className={fieldClass} name="service" defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          <option>AI Consulting</option>
          <option>DevOps</option>
          <option>Cloud & AWS</option>
          <option>Backend Development</option>
          <option>Agile Coaching</option>
        </select>
      </label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-stone-700">
        Message
        <textarea
          className={`${fieldClass} min-h-36 resize-y`}
          name="message"
          placeholder="Tell us about your goals, constraints, and timeline."
        />
      </label>
      <button
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pine-800 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-pine-950 sm:w-auto"
        type="submit"
      >
        Send message
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
