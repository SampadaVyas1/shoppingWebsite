import Images from "@/public/assets/icons";
import React from "react";
import ImageComponent from "../image";
import styles from "./modal.module.scss";

interface IModalProps {
  children: React.ReactNode;
  onClose?: React.MouseEventHandler<HTMLElement>;
  customStyle?: string;
  customBackdrop?: string;
  header?: string;
  showCloseIcon?: boolean;
}

const Modal = (props: IModalProps) => {
  const {
    children,
    onClose,
    customStyle,
    header,
    customBackdrop,
    showCloseIcon = true,
  } = props;
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
        {header && (
          <div className={styles.heading}>
            {header}
            {showCloseIcon && (
              <ImageComponent
                src={Images.close}
                customClass={styles.closeIcon}
                onClick={onClose}
              />
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
