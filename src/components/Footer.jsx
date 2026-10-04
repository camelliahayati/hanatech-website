import { Brand } from './Navbar.jsx';

export default function Footer() {
  return (
    <footer className="studio-footer">
      <div className="footer-grid shell">
        <div className="footer-intro">
          <Brand />
          <p>AI, cloud, backend and product engineering—built with care in Stockholm.</p>
        </div>
        <div className="footer-links">
          <div><h3>Explore</h3><a href="#services">Services</a><a href="#product">Products</a><a href="#about">About</a><a href="#contact">Contact</a></div>
          <div><h3>Products &amp; ventures</h3><a href="#product">HanaMood</a><a href="#product">HanaVoya</a><a href="/bygg">HanaTech Bygg</a></div>
          <div><h3>Contact</h3><a href="mailto:camelliahayati@hanatech.se">camelliahayati@hanatech.se</a><a href="tel:+46766519272">+46 76 651 92 72</a><span>Stockholm, Sweden</span></div>
        </div>
      </div>
      <div className="footer-legal shell">
        <span>© 2026 HanaTech. All rights reserved.</span>
        <div><a href="#home">Home</a><a href="#contact">Book consultation</a></div>
      </div>
    </footer>
  );
}
