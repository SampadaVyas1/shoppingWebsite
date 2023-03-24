import React from "react";
import styles from "./modal.module.scss";

interface IModalProps {
  children: any;
  onClose?: React.MouseEventHandler<HTMLElement>;
  customStyle?: string;
  customBackdrop?: string;
  header?: string;
}

const Modal = (props: IModalProps) => {
  const { children, onClose, customStyle, header, customBackdrop } = props;
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
    <div className={backdropStyle} onClick={onClose}>
      <div className={modelStyle} onClick={handleModalClick}>
        {header && <div className={styles.heading}>{header}</div>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
