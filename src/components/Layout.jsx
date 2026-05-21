import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({
  children,
  pages,
  ctaLabel,
}) {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <Navbar pages={pages} ctaLabel={ctaLabel} />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  );
}
