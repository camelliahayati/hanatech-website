import { ArrowRight } from 'lucide-react';

export default function Button({ children, href, variant = 'primary', className = '' }) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:ring-offset-2';
  const variants = {
    primary:
      'bg-pine-700 text-white shadow-soft hover:-translate-y-0.5 hover:bg-pine-800',
    secondary:
      'border border-pine-700/20 bg-white/80 text-pine-900 hover:-translate-y-0.5 hover:border-pine-700/40 hover:bg-white',
  };

  return (
    <a className={`${base} ${variants[variant]} ${className}`} href={href}>
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5"
      />
    </a>
  );
}
