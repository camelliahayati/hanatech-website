import { ArrowUpRight, Check } from 'lucide-react';
import { aboutHighlights, companyRoadmap, workflow } from '../data/services.js';
import { useLanguage } from '../i18n.jsx';

export default function About({ id }) {
  const { t } = useLanguage();
  return (
    <section id={id} className="content-section about-section section-dark">
      <div className="shell">
        <div className="about-intro">
          <div className="reveal"><p className="eyebrow coral">{t('ABOUT')}</p><h2>{t('Stockholm-based AI startup with global technology ambition.')}</h2><p>{t('HanaTech combines technology strategy, infrastructure depth and practical product execution for teams building the next generation of digital services.')}</p><a href="#contact">{t('Start a strategic conversation')} <ArrowUpRight /></a></div>
          <div className="about-highlights">
            {aboutHighlights.map((item, index) => <article className="reveal" style={{ '--delay': `${index * 70}ms` }} key={item}><span><Check /></span><p>{t(item)}</p></article>)}
          </div>
        </div>

        <div className="about-panel reveal">
          <div className="panel-heading"><p className="eyebrow blue">{t('CLIENT WORKFLOW')}</p><h3>{t('How we deliver with your team.')}</h3><p>{t('A transparent process that aligns business priorities, technical quality and delivery velocity.')}</p></div>
          <div className="workflow-grid">{workflow.map((step, index) => <article key={step.title}><span>{t('STEP')} 0{index + 1}</span><h4>{t(step.title)}</h4><p>{t(step.text)}</p></article>)}</div>
        </div>

        <div className="about-panel reveal">
          <div className="panel-heading"><p className="eyebrow coral">{t('FUTURE ROADMAP')}</p><h3>{t('From consulting excellence toward global AI products.')}</h3><p>{t('Near-term delivery impact connected to long-term product and international growth.')}</p></div>
          <div className="roadmap-grid">{companyRoadmap.map((item) => <article key={item.title}><span>{t(item.phase)}</span><h4>{t(item.title)}</h4><p>{t(item.text)}</p></article>)}</div>
        </div>
      </div>
    </section>
  );
}
