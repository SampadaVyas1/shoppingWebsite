export interface IRouteType {
  id: number;
  path: string;
  name: string;
}
export interface IOptionType {
  id: number;
  label: string;
}

export interface ITransitionWrapperProps {
  animationClassName?: string;
  open?: boolean;
  timeout?: number;
  children: React.ReactNode;
}

export interface IProfileCardProps {
  profileImage: string;
  firstName: string;
  lastName: string;
  designation: string;
  cardBody: React.ReactNode;
  cardFooter: React.ReactNode;
}

export interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
  customStyle?: string;
  customBackdrop?: string;
  header?: string;
}
