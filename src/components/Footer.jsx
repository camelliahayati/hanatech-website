import { Brand } from './Navbar.jsx';

export default function Footer() {
  return (
    <footer className="studio-footer">
      <div className="footer-grid shell">
        <div className="footer-intro">
          <Brand />
          <p>Product engineering and AI-assisted experiences, built with care in Stockholm.</p>
        </div>
        <div className="footer-links">
          <div><h3>Explore</h3><a href="#products">Products</a><a href="#work">Selected work</a><a href="#about">About</a></div>
          <div><h3>Ventures</h3><a href="#hanavoya">HanaVoya</a><a href="/bygg">HanaTech Bygg</a></div>
          <div><h3>Contact</h3><a href="mailto:camelliahayati@hanatech.se">camelliahayati@hanatech.se</a><span>Stockholm, Sweden</span></div>
        </div>
      </div>
      <div className="footer-legal shell">
        <span>© 2026 HanaTech. All rights reserved.</span>
        <div><span>Privacy</span><span>Terms</span></div>
      </div>
    </footer>
  );
}
