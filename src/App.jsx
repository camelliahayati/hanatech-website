import { useMemo } from 'react';
import Layout from './components/Layout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Services from './pages/Services.jsx';

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
  const activeLanguage = 'en';
  const copy = labels[activeLanguage];

  const pages = useMemo(
    () => [
      { id: 'home', label: copy.home, component: Home },
      { id: 'services', label: copy.services, component: Services },
      { id: 'product', label: copy.product, component: Product },
      { id: 'about', label: copy.about, component: About },
      { id: 'contact', label: copy.contact, component: Contact },
    ],
    [copy],
  );

  return (
    <Layout pages={pages} ctaLabel={copy.cta}>
      {pages.map(({ id, component }) => {
        const PageComponent = component;
        return <PageComponent key={id} id={id} />;
      })}
    </Layout>
  );
}
