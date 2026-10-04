import { Brand } from './Navbar.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="studio-footer">
      <div className="footer-grid shell">
        <div className="footer-intro">
          <Brand />
          <p>{t('AI, cloud, backend and product engineering—built with care in Stockholm.')}</p>
        </div>
        <div className="footer-links">
          <div><h3>{t('Explore')}</h3><a href="#services">{t('Services')}</a><a href="#product">{t('Products')}</a><a href="#about">{t('About')}</a><a href="#contact">{t('Contact')}</a></div>
          <div><h3>{t('Products & ventures')}</h3><a href="#product">HanaMood</a><a href="#product">HanaVoya</a><a href="/bygg">HanaTech Bygg</a></div>
          <div><h3>{t('Contact')}</h3><a href="mailto:camelliahayati@hanatech.se">camelliahayati@hanatech.se</a><a href="tel:+46766519272">+46 76 651 92 72</a><span>{t('Stockholm, Sweden')}</span></div>
        </div>
      </div>
      <div className="footer-legal shell">
        <span>{t('© 2026 HanaTech. All rights reserved.')}</span>
        <div><a href="#home">{t('Home')}</a><a href="#contact">{t('Book consultation')}</a></div>
      </div>
    </footer>
  );
}
