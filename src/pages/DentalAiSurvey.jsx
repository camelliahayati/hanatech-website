import { ArrowRight, Check, ClipboardList, Lock, LogOut } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const surveyQuestions = [
  {
    section: 'Understanding the Problem',
    key: 'highest_concern_treatments',
    label: '1. Which treatments generate the highest volume of post-treatment patient concerns?',
    helper: 'Select all that apply.',
    type: 'multiselect',
    options: ['Dental Implants', 'Tooth Extractions', 'Root Canal Treatment', 'Oral Surgery', 'Orthodontics', 'Dentures', 'Pediatric Treatments', 'Other'],
  },
  {
    key: 'patient_contact_frequency',
    label: '2. How frequently do patients contact your clinic after treatment with questions or concerns?',
    type: 'radio',
    options: ['Very Rarely', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
  },
  {
    key: 'weekly_staff_time',
    label: '3. Approximately how much staff time is spent each week handling post-treatment patient concerns?',
    type: 'radio',
    options: ['Less than 1 hour', '1-5 hours', '6-10 hours', '11-20 hours', 'More than 20 hours'],
  },
  {
    key: 'earlier_complication_detection',
    label: '4. Have you experienced cases where a complication could have been detected earlier if the patient had communicated sooner?',
    type: 'radio',
    options: ['Yes', 'No', 'Not Sure'],
  },
  {
    key: 'followup_challenge_score',
    label: '5. On a scale of 1-10, how significant is the challenge of post-treatment follow-up in your clinic?',
    helper: '1 = Not a problem. 10 = Extremely significant problem.',
    type: 'scale',
  },
  {
    section: 'Current Workflow',
    key: 'contact_channels',
    label: '6. How do patients typically contact your clinic after treatment?',
    helper: 'Select all that apply.',
    type: 'multiselect',
    options: ['Phone', 'Email', 'SMS', 'WhatsApp', 'Patient Portal', 'Other'],
  },
  {
    key: 'photo_frequency',
    label: '7. How often do patients send photos of their recovery or symptoms?',
    type: 'radio',
    options: ['Never', 'Rarely', 'Sometimes', 'Frequently', 'Very Frequently'],
  },
  {
    key: 'practice_software',
    label: '8. Which practice management or dental software do you currently use?',
    type: 'text',
  },
  {
    key: 'followup_process_satisfaction',
    label: '9. How satisfied are you with your current post-treatment follow-up process?',
    helper: '1 = Very dissatisfied. 10 = Very satisfied.',
    type: 'scale',
  },
  {
    section: 'AI Solution Validation',
    key: 'ai_platform_value',
    label: '10. How valuable would an AI-assisted platform be if it could help identify patients at risk of complications based on submitted photos and symptoms?',
    helper: '1 = No value. 10 = Extremely valuable.',
    type: 'scale',
  },
  {
    key: 'valuable_ai_capabilities',
    label: '11. Which AI-powered capabilities would be most valuable to your clinic?',
    helper: 'Select all that apply.',
    type: 'multiselect',
    options: [
      'Infection Detection',
      'Healing Progress Assessment',
      'Swelling Detection',
      'Pain Risk Prediction',
      'Automated Patient Triage',
      'Clinical Documentation Assistance',
      'Multilingual Patient Communication',
      'Automated Follow-Up Scheduling',
    ],
  },
  {
    key: 'ai_comfort_score',
    label: '12. How comfortable would you be using AI as a support tool for post-treatment monitoring?',
    helper: '1 = Not comfortable at all. 10 = Very comfortable.',
    type: 'scale',
  },
  {
    section: 'Risks & Concerns',
    key: 'adoption_concerns',
    label: '13. What would be your primary concerns about adopting an AI-powered post-treatment monitoring platform?',
    helper: 'Select all that apply.',
    type: 'multiselect',
    options: ['GDPR Compliance', 'Medical Liability', 'AI Accuracy', 'Regulatory Approval', 'Data Security', 'Workflow Disruption', 'Patient Adoption', 'No Major Concerns'],
  },
  {
    section: 'Commercial Validation',
    key: 'reasonable_monthly_fee',
    label: '14. If such a platform reduced post-treatment workload by 30-50%, what monthly fee would you consider reasonable?',
    type: 'radio',
    options: ['Less than €100', '€100-€250', '€250-€500', '€500-€1,000', 'More than €1,000'],
  },
  {
    key: 'pilot_interest',
    label: '15. Would you be interested in participating in a pilot program for this solution?',
    type: 'radio',
    options: ['Yes', 'Maybe', 'No'],
  },
  {
    key: 'pilot_participation',
    label: 'Follow-up: Would you be willing to participate or contribute in these ways?',
    helper: 'Select all that apply.',
    type: 'multiselect',
    options: [
      'Participate in a Pilot Project',
      'Join a Research Collaboration',
      'Participate in a Clinical Validation Study',
      'Test an Early MVP Version',
      'Provide Product Feedback',
      'Provide a Letter of Support if the pilot is successful',
    ],
  },
  {
    section: 'Final Open Question',
    key: 'biggest_monitoring_challenge',
    label: '16. What is the biggest challenge your clinic currently faces in post-treatment patient monitoring and follow-up?',
    type: 'longtext',
  },
];

const initialSurveyAnswers = surveyQuestions.reduce((answers, question) => {
  answers[question.key] = question.type === 'multiselect' ? [] : '';
  return answers;
}, {});

const initialForm = {
  clinic_name: '',
  contact_name: '',
  email: '',
  phone: '',
  role: '',
  clinic_size: '1-3 providers',
  current_software: '',
  ai_priority: 'Patient communication',
  timeline: 'This quarter',
  survey_answers: initialSurveyAnswers,
  notes: '',
};

function SurveyShell({ children }) {
  return (
    <div className="dental-app-shell">
      <header className="dental-header">
        <a className="dental-brand" href="/">
          <img src="/assets/hanatech-logo-survey.png" alt="HanaTech" />
        </a>
        <nav>
          <a href="/dental-ai-survey">Survey</a>
          <a href="/admin/login">Admin</a>
        </nav>
      </header>
      {children}
    </div>
  );
}

export function DentalSurveyLandingPage() {
  return (
    <SurveyShell>
      <main className="dental-landing">
        <img
          src="/assets/hanatech-dental-ai-hero.png"
          alt=""
          className="dental-landing-image"
        />
        <div className="dental-landing-content">
          <p className="dental-eyebrow">Dental AI systems for modern clinics</p>
          <h1>HanaTech</h1>
          <p>
            Intelligent workflow, patient insight, and operational analytics for
            clinics ready to move with more precision.
          </p>
          <a className="dental-primary-button" href="/dental-ai-survey/start">
            Start survey <ArrowRight size={18} />
          </a>
        </div>
      </main>
    </SurveyShell>
  );
}

export function DentalSurveyPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, error: '' });

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function updateSurveyAnswer(event) {
    const { checked, name, type, value } = event.target;
    const currentValue = form.survey_answers[name];
    const nextValue = type === 'checkbox'
      ? checked
        ? [...(Array.isArray(currentValue) ? currentValue : []), value]
        : (Array.isArray(currentValue) ? currentValue : []).filter((item) => item !== value)
      : value;

    setForm({
      ...form,
      survey_answers: {
        ...form.survey_answers,
        [name]: nextValue,
      },
    });
  }

  async function submit(event) {
    event.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      const response = await fetch(`${API_BASE}/api/survey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Survey submission failed');
      window.location.href = '/dental-ai-survey/thank-you';
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  }

  return (
    <SurveyShell>
      <main className="dental-page-shell">
        <section className="dental-form-layout">
          <div>
            <p className="dental-eyebrow">Clinic readiness survey</p>
            <h1>Dental AI Survey</h1>
            <p className="dental-muted">
              Help HanaTech validate an AI-assisted post-treatment monitoring platform for dental clinics.
            </p>
          </div>
          <form className="dental-panel dental-form-grid" onSubmit={submit}>
            <div className="dental-section-title dental-full-span">
              <p className="dental-eyebrow">Survey</p>
              <h2>Clinic information</h2>
            </div>
            <Input label="Clinic name" name="clinic_name" value={form.clinic_name} onChange={updateField} required />
            <Input label="Contact name" name="contact_name" value={form.contact_name} onChange={updateField} required />
            <Input label="Email" type="email" name="email" value={form.email} onChange={updateField} required />
            <Input label="Phone" name="phone" value={form.phone} onChange={updateField} />
            <Input label="Role" name="role" value={form.role} onChange={updateField} />
            <Select label="Clinic size" name="clinic_size" value={form.clinic_size} onChange={updateField} options={['1-3 providers', '4-8 providers', '9+ providers', 'Multi-location']} />
            <Input label="Current software" name="current_software" value={form.current_software} onChange={updateField} />
            <Select label="AI priority" name="ai_priority" value={form.ai_priority} onChange={updateField} options={['Patient communication', 'Scheduling efficiency', 'Diagnostic support', 'Revenue intelligence', 'Clinical documentation']} />
            <Select label="Timeline" name="timeline" value={form.timeline} onChange={updateField} options={['This quarter', 'Next 6 months', 'This year', 'Exploring only']} />
            <div className="dental-section-title dental-full-span">
              <p className="dental-eyebrow">Validation questions</p>
              <h2>Questions and answers</h2>
            </div>
            {surveyQuestions.map((question) => (
              <fieldset className="dental-question-block dental-full-span" key={question.key}>
                {question.section && <p className="dental-question-section">{question.section}</p>}
                <legend>{question.label}</legend>
                {question.helper && <p className="dental-question-helper">{question.helper}</p>}
                <QuestionControl question={question} value={form.survey_answers[question.key]} onChange={updateSurveyAnswer} />
              </fieldset>
            ))}
            <label className="dental-full-span">
              <span>Additional notes</span>
              <textarea name="notes" value={form.notes} onChange={updateField} rows="5" />
            </label>
            {status.error && <p className="dental-error dental-full-span">{status.error}</p>}
            <div className="dental-form-actions dental-full-span">
              <button className="dental-primary-button" disabled={status.loading}>
                {status.loading ? 'Submitting...' : 'Submit survey'} <ClipboardList size={18} />
              </button>
            </div>
          </form>
        </section>
      </main>
    </SurveyShell>
  );
}

function Input({ label, ...props }) {
  return (
    <label>
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}

function Select({ label, options, ...props }) {
  return (
    <label>
      <span>{label}</span>
      <select {...props}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function QuestionControl({ question, value, onChange }) {
  if (question.type === 'text' || question.type === 'longtext') {
    return (
      <textarea
        className="dental-question-textarea"
        name={question.key}
        value={value || ''}
        onChange={onChange}
        rows={question.type === 'longtext' ? 5 : 3}
      />
    );
  }

  if (question.type === 'scale') {
    return (
      <div className="dental-scale-grid">
        {Array.from({ length: 10 }, (_, index) => String(index + 1)).map((option) => (
          <label className="dental-scale-choice" key={option}>
            <input type="radio" name={question.key} value={option} checked={value === option} onChange={onChange} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="dental-answer-grid">
      {question.options.map((option) => {
        const isMulti = question.type === 'multiselect';
        return (
          <label className="dental-choice-card" key={option}>
            <input
              type={isMulti ? 'checkbox' : 'radio'}
              name={question.key}
              value={option}
              checked={isMulti ? Array.isArray(value) && value.includes(option) : value === option}
              onChange={onChange}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

export function DentalSurveyThankYouPage() {
  return (
    <SurveyShell>
      <main className="dental-center-page">
        <section className="dental-panel dental-success-panel">
          <span className="dental-success-icon"><Check /></span>
          <h1>Thank you</h1>
          <p>Your survey has been received. HanaTech will review the details and prepare next steps.</p>
          <a className="dental-secondary-button" href="/">Back to HanaTech</a>
        </section>
      </main>
    </SurveyShell>
  );
}

export function AdminLoginPage() {
  const [form, setForm] = useState({ username: 'admin', password: '' });
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      setError('Invalid username or password');
      return;
    }
    const data = await response.json();
    localStorage.setItem('hanatech_admin_token', data.access_token);
    window.location.href = '/admin/dental-survey';
  }

  return (
    <SurveyShell>
      <main className="dental-center-page">
        <form className="dental-panel dental-login-panel" onSubmit={submit}>
          <span className="dental-icon-pill"><Lock /></span>
          <h1>Admin Login</h1>
          <Input label="Username" name="username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required />
          <Input label="Password" name="password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          {error && <p className="dental-error">{error}</p>}
          <button className="dental-primary-button">Sign in</button>
        </form>
      </main>
    </SurveyShell>
  );
}

export function AdminDentalSurveyPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('hanatech_admin_token');

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/admin/surveys`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load surveys');
        return response.json();
      })
      .then(setRows)
      .catch((err) => setError(err.message));
  }, [token]);

  const content = useMemo(() => {
    if (!token) {
      window.location.href = '/admin/login';
      return null;
    }
    if (error) return <p className="dental-error">{error}</p>;
    if (rows.length === 0) return <p className="dental-muted">No survey submissions yet.</p>;
    return (
      <div className="dental-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Clinic</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Priority</th>
              <th>Answers</th>
              <th>Timeline</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.clinic_name}</td>
                <td>{row.contact_name}</td>
                <td>{row.email}</td>
                <td>{row.ai_priority}</td>
                <td>
                  <details>
                    <summary>View</summary>
                    <dl className="dental-answer-list">
                      {Object.entries(row.survey_answers || {}).map(([key, value]) => (
                        <div key={key}>
                          <dt>{surveyQuestions.find((question) => question.key === key)?.label || key}</dt>
                          <dd>{formatAnswer(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                </td>
                <td>{row.timeline}</td>
                <td>{new Date(row.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }, [error, rows, token]);

  return (
    <SurveyShell>
      <main className="dental-page-shell">
        <section className="dental-admin-head">
          <div>
            <p className="dental-eyebrow">Protected dashboard</p>
            <h1>Dental Survey Responses</h1>
          </div>
          <button className="dental-secondary-button" onClick={() => { localStorage.removeItem('hanatech_admin_token'); window.location.href = '/admin/login'; }}>
            <LogOut size={18} /> Sign out
          </button>
        </section>
        <section className="dental-panel">{content}</section>
      </main>
    </SurveyShell>
  );
}

function formatAnswer(value) {
  if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : 'No answer';
  return value || 'No answer';
}
