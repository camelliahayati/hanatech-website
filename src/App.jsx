import Layout from './components/Layout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import HanaTechBygg from './pages/HanaTechBygg.jsx';
import Product from './pages/Product.jsx';
import Services from './pages/Services.jsx';
import {
  AdminDentalSurveyPage,
  AdminLoginPage,
  DentalSurveyLandingPage,
  DentalSurveyPage,
  DentalSurveyThankYouPage,
} from './pages/DentalAiSurvey.jsx';

const labels = {
  en: {
    home: 'Home',
    services: 'Services',
    product: 'Product',
    about: 'About',
    contact: 'Contact',
    cta: 'Book consultation',
  },
  sv: {
    home: 'Hem',
    services: 'Tjanster',
    product: 'Produkt',
    about: 'Om oss',
    contact: 'Kontakt',
    cta: 'Boka konsultation',
  },
  fa: {
    home: 'خانه',
    services: 'خدمات',
    product: 'محصول',
    about: 'درباره',
    contact: 'تماس',
    cta: 'رزرو مشاوره',
  },
};

export default function App() {
  const path = window.location.pathname;
  const host = window.location.hostname;
  if (host === 'bygg.hanatech.se' || path === '/bygg') return <HanaTechBygg />;
  if (path === '/dental-ai-survey') return <DentalSurveyLandingPage />;
  if (path === '/dental-ai-survey/start') return <DentalSurveyPage />;
  if (path === '/dental-ai-survey/thank-you') return <DentalSurveyThankYouPage />;
  if (path === '/admin/login') return <AdminLoginPage />;
  if (path === '/admin/dental-survey') return <AdminDentalSurveyPage />;

  const activeLanguage = 'en';
  const copy = labels[activeLanguage];

  const pages = [
    { id: 'home', label: copy.home, component: Home },
    { id: 'services', label: copy.services, component: Services },
    { id: 'product', label: copy.product, component: Product },
    { id: 'about', label: copy.about, component: About },
    { id: 'contact', label: copy.contact, component: Contact },
  ];

  return (
    <Layout pages={pages} ctaLabel={copy.cta}>
      {pages.map(({ id, component }) => {
        const PageComponent = component;
        return <PageComponent key={id} id={id} />;
      })}
    </Layout>
  );
}
