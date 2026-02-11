/**
 * Component: ConfirmModal
 * Modal de confirmation réutilisable
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
      icon: '⚠️',
      iconBg: 'bg-red-900/30',
      iconColor: 'text-red-500',
      confirmBtn: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: '⚠️',
      iconBg: 'bg-yellow-900/30',
      iconColor: 'text-yellow-500',
      confirmBtn: 'bg-yellow-600 hover:bg-yellow-700',
    },
    info: {
      icon: 'ℹ️',
      iconBg: 'bg-blue-900/30',
      iconColor: 'text-blue-500',
      confirmBtn: 'bg-blue-600 hover:bg-blue-700',
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
        <div className={`shrink-0 w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center`}>
          <span className={`text-2xl ${style.iconColor}`}>{style.icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm">{message}</p>
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
          className={style.confirmBtn}
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
