/**
 * Component: Link
 * Composant réutilisable pour les liens - Style professionnel
 */

import NextLink from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children: ReactNode;
  external?: boolean;
}

export default function Link({
  href,
  variant = 'primary',
  children,
  external = false,
  className = '',
  ...props
}: LinkProps) {
  const variants = {
    primary: 'text-crimson-400 hover:text-crimson-300 transition-all duration-200',
    secondary: 'text-neutral-400 hover:text-neutral-300 transition-all duration-200',
    danger: 'text-crimson-600 hover:text-crimson-500 transition-all duration-200',
    ghost: 'text-crimson-400 hover:text-crimson-300 underline underline-offset-2 transition-all duration-200',
  };

  const linkClasses = `${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={linkClasses} {...props}>
      {children}
    </NextLink>
  );
}
