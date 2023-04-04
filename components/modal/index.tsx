import React from "react";
import TransitionWrapper from "../transitionWrapper";
import styles from "./modal.module.scss";
import { IModalProps } from "@/common/types";

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
    <TransitionWrapper open={open}>
      <div className={backdropStyle} onClick={onClose}>
        <div className={modelStyle} onClick={handleModalClick}>
          {header && <div className={styles.heading}>{header}</div>}
          {children}
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default Modal;
