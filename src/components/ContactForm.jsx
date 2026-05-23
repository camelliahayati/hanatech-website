import { Send } from 'lucide-react';

const fieldClass =
  'w-full rounded-[8px] border border-pine-200/10 bg-pine-950/75 px-4 py-3 text-sm text-pine-100 outline-none transition placeholder:text-pine-200/45 focus:border-pine-400 focus:ring-4 focus:ring-pine-900';

const FORM_ACTION = 'https://formsubmit.co/camelliahayati@hanatech.se';
const SUCCESS_REDIRECT_URL = 'https://hanatech.se/contact?success=true';

export default function ContactForm() {
  const handleSubmitDebug = (event) => {
    const form = event.currentTarget;

    console.info('[HanaTech ContactForm] Submit triggered', {
      action: form.action,
      method: form.method,
      isValid: form.checkValidity(),
      timestamp: new Date().toISOString(),
    });

    if (!form.checkValidity()) {
      console.warn('[HanaTech ContactForm] Browser validation blocked submit');
      form.reportValidity();
      return;
    }

    console.info('[HanaTech ContactForm] Browser will POST to FormSubmit now');
  };

  return (
    <form
      action={FORM_ACTION}
      method="POST"
      encType="multipart/form-data"
      className="rounded-[8px] border border-pine-200/10 bg-pine-900/55 p-5 shadow-soft sm:p-8"
      onSubmit={handleSubmitDebug}
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="New HanaTech Contact Submission" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={SUCCESS_REDIRECT_URL} />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-pine-100/85">
          Name
          <input
            className={fieldClass}
            name="name"
            placeholder="Your name"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-pine-100/85">
          Email
          <input
            className={fieldClass}
            type="email"
            name="email"
            placeholder="you@company.com"
            required
          />
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-medium text-pine-100/85">
        Company
        <input className={fieldClass} name="company" placeholder="Company name" />
      </label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-pine-100/85">
        Inquiry type
        <select className={fieldClass} name="inquiryType" defaultValue="">
          <option value="" disabled>
            Select inquiry type
          </option>
          <option>Business inquiry</option>
          <option>Project collaboration</option>
          <option>Strategic partnership</option>
          <option>Investment and media</option>
        </select>
      </label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-pine-100/85">
        Project type
        <select className={fieldClass} name="projectType" defaultValue="">
          <option value="" disabled>
            Select project type
          </option>
          <option>AI consulting and automation</option>
          <option>Cloud and AWS infrastructure</option>
          <option>Backend and API development</option>
          <option>DevOps and CI/CD modernization</option>
          <option>HanaAI Platform partnership</option>
        </select>
      </label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-pine-100/85">
        What can we help with?
        <select className={fieldClass} name="service" defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          <option>AI Consulting</option>
          <option>Cloud / AWS Infrastructure</option>
          <option>Backend & API Development</option>
          <option>Data Analysis</option>
          <option>Network Solutions</option>
          <option>DevOps / CI-CD</option>
          <option>HanaAI Product</option>
          <option>Technical Consulting</option>
        </select>
      </label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-pine-100/85">
        Preferred timeline
        <select className={fieldClass} name="timeline" defaultValue="">
          <option value="" disabled>
            Select timeline
          </option>
          <option>Immediate (0-1 month)</option>
          <option>Near term (1-3 months)</option>
          <option>Planned initiative (3-6 months)</option>
          <option>Long-term planning (6+ months)</option>
        </select>
      </label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-pine-100/85">
        Message
        <textarea
          className={`${fieldClass} min-h-36 resize-y`}
          name="message"
          placeholder="Tell us about your business goals, technical context, and expected outcomes."
          required
        />
      </label>
      <div className="mt-5 rounded-[8px] border border-pine-200/10 bg-pine-950/75 p-4 text-sm text-pine-100/75">
        Prefer a direct planning call? Request a consultation and we will send
        available time slots for a 45-minute strategy session.
      </div>
      <button
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pine-500 px-5 py-3 text-sm font-semibold text-pine-950 transition hover:-translate-y-0.5 hover:bg-pine-400 sm:w-auto"
        type="submit"
      >
        Send inquiry and request consultation
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
