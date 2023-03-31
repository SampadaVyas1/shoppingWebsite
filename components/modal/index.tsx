import React from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./modal.module.scss";

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
  customStyle?: string;
  customBackdrop?: string;
  header?: string;
}

const Modal = (props: IModalProps) => {
  const { children, onClose, customStyle, header, customBackdrop, open } =
    props;
  const backdropStyle = customBackdrop
    ? customBackdrop
    : `${styles.modalBackdrop}`;
  const modelStyle = customStyle
    ? `${styles.modal} ${customStyle}`
    : `${styles.modal}`;

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <CSSTransition in={open} timeout={300} classNames="alert" unmountOnExit>
      <div className={backdropStyle} onClick={onClose}>
        <div className={modelStyle} onClick={handleModalClick}>
          {header && <div className={styles.heading}>{header}</div>}
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
