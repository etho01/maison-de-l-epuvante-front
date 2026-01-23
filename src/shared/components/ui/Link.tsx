/**
 * Component: Link
 * Composant réutilisable pour les liens
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
    primary: 'text-red-500 hover:text-red-400 transition-colors',
    secondary: 'text-gray-400 hover:text-gray-300 transition-colors',
    danger: 'text-red-700 hover:text-red-600 transition-colors',
    ghost: 'text-red-500 hover:text-red-400 underline transition-colors',
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
