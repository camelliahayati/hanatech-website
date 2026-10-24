import { ArrowUpRight } from 'lucide-react';

export default function Button({ children, href, variant = 'primary', className = '', external = false }) {
  return (
    <a className={`button button-${variant} ${className}`} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
