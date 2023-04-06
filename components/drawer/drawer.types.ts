export interface IDrawerProps {
  title?: JSX.Element | string;
  onClose?: () => void;
  children: React.ReactNode;
  isOpen?: boolean;
  customDrawerStyle?: string;
  customHeaderStyle?: string;
}
