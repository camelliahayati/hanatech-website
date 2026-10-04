import { useEffect } from 'react';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Layout({ children }) {
  const { language } = useLanguage();
  useEffect(() => {
    document.title = language === 'sv' ? 'HanaTech | Produktutveckling från Stockholm' : 'HanaTech | Product Engineering from Stockholm';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = language === 'sv'
      ? 'HanaTech är en produktutvecklingsstudio i Stockholm som bygger tillförlitliga digitala produkter, flerspråkiga upplevelser och praktiska AI-lösningar.'
      : 'HanaTech is a Stockholm product engineering studio building reliable digital products, multilingual experiences and useful AI-assisted workflows.';
  }, [language]);
  return (
    <div className="studio-site">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
