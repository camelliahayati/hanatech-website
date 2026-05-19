import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({ children, pages }) {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <Navbar pages={pages} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
