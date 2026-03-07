/**
 * Component: ErrorMessage
 * Composant réutilisable pour afficher les erreurs - Style professionnel
 */

import { ReactNode } from 'react';

interface ErrorMessageProps {
  message?: string | null;
  children?: ReactNode;
}

export default function ErrorMessage({ message, children }: ErrorMessageProps) {
  if (!message && !children) return null;

  return (
    <div className="glass-effect border border-crimson-700/50 bg-crimson-950/30 text-crimson-300 px-5 py-4 rounded-xl flex items-start gap-3 shadow-crimson-sm">
      <svg className="w-5 h-5 text-crimson-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <div className="flex-1 text-sm leading-relaxed">
        {message || children}
      </div>
    </div>
  );
}
