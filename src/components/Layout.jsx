import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  return (
    <div className="studio-site">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
