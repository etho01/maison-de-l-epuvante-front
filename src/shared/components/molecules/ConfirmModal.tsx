/**
 * Component: ConfirmModal
 * Modal de confirmation réutilisable - Style professionnel
 */

import React from 'react';
import { Button } from '../atoms';
import { Modal, ModalFooter } from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'danger',
  isLoading = false,
}) => {
  const variantStyles = {
    danger: {
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>,
      iconBg: 'bg-crimson-950/50',
      iconColor: 'text-crimson-400',
      confirmVariant: 'danger' as const,
    },
    warning: {
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>,
      iconBg: 'bg-yellow-950/50',
      iconColor: 'text-yellow-400',
      confirmVariant: 'primary' as const,
    },
    info: {
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>,
      iconBg: 'bg-blue-950/50',
      iconColor: 'text-blue-400',
      confirmVariant: 'primary' as const,
    },
  };

  const style = variantStyles[variant];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      showCloseButton={false}
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-14 h-14 rounded-xl ${style.iconBg} flex items-center justify-center ${style.iconColor}`}>
          {style.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-100 mb-2">{title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">{message}</p>
        </div>
      </div>

      <ModalFooter>
        <Button
          onClick={onClose}
          variant="secondary"
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant={style.confirmVariant}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
