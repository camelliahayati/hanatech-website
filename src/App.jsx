import Layout from './components/Layout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';

const pages = [
  { id: 'home', label: 'Home', component: Home },
  { id: 'services', label: 'Services', component: Services },
  { id: 'about', label: 'About', component: About },
  { id: 'contact', label: 'Contact', component: Contact },
];

export default function App() {
  return (
    <Layout pages={pages}>
      {pages.map(({ id, component }) => {
        const PageComponent = component;
        return <PageComponent key={id} id={id} />;
      })}
    </Layout>
  );
}
