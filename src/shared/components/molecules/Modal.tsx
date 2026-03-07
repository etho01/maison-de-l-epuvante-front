/**
 * Component: Modal
 * Composant modal générique et réutilisable - Style professionnel
 */

import React, { useEffect, ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    full: 'max-w-full mx-4',
  };

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-effect animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div 
        className={`glass-effect border-2 border-crimson-700/50 rounded-2xl shadow-crimson-lg ${sizeClasses[size]} w-full animate-fadeIn ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec titre optionnel */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-crimson-900/30">
            {title && (
              <h3 className="text-xl font-bold text-neutral-100">{title}</h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-auto text-neutral-400 hover:text-crimson-400 transition-colors p-1 rounded-lg hover:bg-neutral-800/50"
                aria-label="Fermer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Contenu */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Composants helpers pour structurer le contenu du modal
 */
export const ModalHeader: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const ModalBody: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`${className}`}>
    {children}
  </div>
);

export const ModalFooter: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`mt-6 flex gap-3 justify-end ${className}`}>
    {children}
  </div>
);
