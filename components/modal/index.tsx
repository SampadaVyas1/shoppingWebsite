import Images from "@/public/assets/icons";
import React from "react";
import ImageComponent from "../image";
import TransitionWrapper from "../transitionWrapper";
import styles from "./modal.module.scss";
import { IModalProps } from "./modal.types";

const Modal = (props: IModalProps) => {
  const {
    children,
    onClose,
    customStyle,
    header,
    customBackdrop,
    open,
    showCloseIcon,
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
    <TransitionWrapper open={open}>
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
    </TransitionWrapper>
  );
};
Modal.defaultProps = {
  header: "",
} as IModalProps;
export default Modal;
