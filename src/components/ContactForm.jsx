import { Send } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n.jsx';

const fieldClass = 'studio-field';

const FORM_ACTION = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';

export default function ContactForm() {
  const { t } = useLanguage();
  const [submitState, setSubmitState] = useState('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    console.info('[HanaTech ContactForm] Submit triggered', {
      endpoint: FORM_ACTION,
      hasAccessKey: Boolean(WEB3FORMS_ACCESS_KEY),
      isValid: form.checkValidity(),
      timestamp: new Date().toISOString(),
    });

    if (!form.checkValidity()) {
      console.warn('[HanaTech ContactForm] Browser validation blocked submit');
      form.reportValidity();
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmitState('error');
      setFeedbackMessage(
        t('Web3Forms access key is missing. Add VITE_WEB3FORMS_ACCESS_KEY and redeploy.'),
      );
      return;
    }

    setSubmitState('submitting');
    setFeedbackMessage('');

    try {
      const formData = new FormData(form);
      formData.set('access_key', WEB3FORMS_ACCESS_KEY);

      const response = await fetch(FORM_ACTION, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const result = await response.json();
      console.info('[HanaTech ContactForm] Web3Forms response', {
        ok: response.ok,
        success: result?.success,
        message: result?.message,
      });

      if (response.ok && result?.success) {
        form.reset();
        setSubmitState('success');
        setFeedbackMessage(t('Thank you. Your inquiry was sent successfully.'));
        return;
      }

      throw new Error(result?.message || 'Submission failed');
    } catch (error) {
      console.error('[HanaTech ContactForm] Web3Forms error', error);
      setSubmitState('error');
      setFeedbackMessage(
        t('Unable to send right now. Please try again or email camelliahayati@hanatech.se directly.'),
      );
    }
  };

  return (
    <form
      action={FORM_ACTION}
      method="POST"
      encType="multipart/form-data"
      className="contact-form"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="New HanaTech Contact Submission" />
      <input type="hidden" name="from_name" value="HanaTech Website" />

      <div className="form-row">
        <label className="contact-field">
          {t('Name')}
          <input
            className={fieldClass}
            name="name"
            placeholder={t('Your name')}
            required
          />
        </label>
        <label className="contact-field">
          {t('Email')}
          <input
            className={fieldClass}
            type="email"
            name="email"
            placeholder="you@company.com"
            required
          />
        </label>
      </div>
      <label className="contact-field">
        {t('Company')}
        <input className={fieldClass} name="company" placeholder={t('Company name')} />
      </label>
      <label className="contact-field">
        {t('Inquiry type')}
        <select className={fieldClass} name="inquiryType" defaultValue="">
          <option value="" disabled>
            {t('Select inquiry type')}
          </option>
          {['Business inquiry', 'Project collaboration', 'Strategic partnership', 'Investment and media'].map((item) => <option key={item} value={item}>{t(item)}</option>)}
        </select>
      </label>
      <label className="contact-field">
        {t('Project type')}
        <select className={fieldClass} name="projectType" defaultValue="">
          <option value="" disabled>
            {t('Select project type')}
          </option>
          {['AI consulting and automation', 'Cloud and AWS infrastructure', 'Backend and API development', 'DevOps and CI/CD modernization', 'HanaMood Platform partnership'].map((item) => <option key={item} value={item}>{t(item)}</option>)}
        </select>
      </label>
      <label className="contact-field">
        {t('What can we help with?')}
        <select className={fieldClass} name="service" defaultValue="">
          <option value="" disabled>
            {t('Select a service')}
          </option>
          {['AI Consulting', 'Cloud / AWS Infrastructure', 'Backend & API Development', 'Data Analysis', 'Network Solutions', 'DevOps / CI-CD', 'HanaMood Product', 'Technical Consulting'].map((item) => <option key={item} value={item}>{t(item)}</option>)}
        </select>
      </label>
      <label className="contact-field">
        {t('Preferred timeline')}
        <select className={fieldClass} name="timeline" defaultValue="">
          <option value="" disabled>
            {t('Select timeline')}
          </option>
          {['Immediate (0-1 month)', 'Near term (1-3 months)', 'Planned initiative (3-6 months)', 'Long-term planning (6+ months)'].map((item) => <option key={item} value={item}>{t(item)}</option>)}
        </select>
      </label>
      <label className="contact-field">
        {t('Message')}
        <textarea
          className={`${fieldClass} studio-textarea`}
          name="message"
          placeholder={t('Tell us about your business goals, technical context, and expected outcomes.')}
          required
        />
      </label>
      <div className="form-note">
        {t('Prefer a direct planning call? Request a consultation and we will send available time slots for a 45-minute strategy session.')}
      </div>
      <button
        className="form-submit"
        type="submit"
        disabled={submitState === 'submitting'}
      >
        {submitState === 'submitting'
          ? t('Sending inquiry...')
          : t('Send inquiry and request consultation')}
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
      {feedbackMessage ? (
        <p
          className={`form-feedback ${submitState === 'success' ? 'success' : 'error'}`}
          role="status"
          aria-live="polite"
        >
          {feedbackMessage}
        </p>
      ) : null}
    </form>
  );
}
