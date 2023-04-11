export interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
  customStyle?: string;
  customBackdrop?: string;
  header?: string;
}
