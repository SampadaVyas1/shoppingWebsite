export interface IConfirmationModalProps {
  title: JSX.Element | string;
  description: JSX.Element | string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancelButtonClick?: () => void;
  onConfirmButtonClick?: () => void;
  open?: boolean;
}
