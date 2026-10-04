import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { label: 'HanaVoya', href: '#hanavoya' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Selected work', href: '#work' },
  { label: 'About', href: '#about' },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="HanaTech home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>HanaTech</span>
    </a>
  );
}

export { Brand };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`studio-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="studio-nav" aria-label="Main navigation">
        <Brand />
        <div className="desktop-links">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
        <a className="nav-cta" href="#contact">
          Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          {links.map((link) => <a key={link.href} href={link.href} onClick={close}>{link.label}</a>)}
          <a className="button button-primary" href="#contact" onClick={close}>Start a conversation</a>
        </div>
      )}
    </header>
  );
}
