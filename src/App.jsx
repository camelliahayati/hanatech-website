import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import HanaTechBygg from './pages/HanaTechBygg.jsx';
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
  if (host === 'bygg.hanatech.se' || path === '/bygg') return <HanaTechBygg />;
  if (path === '/dental-ai-survey') return <DentalSurveyLandingPage />;
  if (path === '/dental-ai-survey/start') return <DentalSurveyPage />;
  if (path === '/dental-ai-survey/thank-you') return <DentalSurveyThankYouPage />;
  if (path === '/admin/login') return <AdminLoginPage />;
  if (path === '/admin/dental-survey') return <AdminDentalSurveyPage />;

  return (
    <Layout>
      <Home />
    </Layout>
  );
}
