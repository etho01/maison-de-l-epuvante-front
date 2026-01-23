/**
 * Component: ErrorMessage
 * Composant réutilisable pour afficher les erreurs
 */

import { ReactNode } from 'react';

interface ErrorMessageProps {
  message?: string | null;
  children?: ReactNode;
}

export default function ErrorMessage({ message, children }: ErrorMessageProps) {
  if (!message && !children) return null;

  return (
    <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-md flex items-start gap-3">
      <span className="text-xl flex-shrink-0">⚠️</span>
      <div className="flex-1">
        {message || children}
      </div>
    </div>
  );
}
