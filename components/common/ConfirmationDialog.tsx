import React from 'react';
import Button from './Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  confirmVariant = 'danger',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative">
        <h3 id="confirmation-dialog-title" className="text-xl font-bold mb-4 text-gray-800">
          {title}
        </h3>
        <p id="confirmation-dialog-description" className="text-gray-700 mb-6">
          {message}
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onCancel} aria-label={cancelText}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} aria-label={confirmText}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
