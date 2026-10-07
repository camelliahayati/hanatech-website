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

export default function App() {
  const path = window.location.pathname;
  const host = window.location.hostname;
  const isHanaByggHost =
    host === 'bygg.hanatech.se' ||
    host === 'hanabygg.se' ||
    host === 'www.hanabygg.se' ||
    host.startsWith('hana-bygg');

  if (isHanaByggHost || path === '/bygg') return <HanaTechBygg />;
  if (path === '/dental-ai-survey') return <DentalSurveyLandingPage />;
  if (path === '/dental-ai-survey/start') return <DentalSurveyPage />;
  if (path === '/dental-ai-survey/thank-you') return <DentalSurveyThankYouPage />;
  if (path === '/admin/login') return <AdminLoginPage />;
  if (path === '/admin/dental-survey') return <AdminDentalSurveyPage />;

  return (
    <Layout>
      <Home id="home" />
      <Services id="services" />
      <Product id="product" />
      <About id="about" />
      <Contact id="contact" />
    </Layout>
  );
}
