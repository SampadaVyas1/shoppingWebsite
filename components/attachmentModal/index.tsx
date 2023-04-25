import { useRef } from "react";
import ImageComponent from "../imageComponent";
import TransitionWrapper from "../transitionWrapper";
import styles from "./attachmentModal.module.scss";
import Images from "@/public/assets/icons";
import { IAttachmentModalProps } from "./attachmentModal.types";

const AttachmentModal = ({ open, onSelection }: IAttachmentModalProps) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageSelection = () => {
    imageRef.current && imageRef.current.click();
  };
  const handleFileSelection = () => {
    fileRef.current && fileRef.current.click();
  };

  const onImageSelect = (event: any) => {
    const file = event.target.files[0];
    file && onSelection(event.target.files[0]);
  };

  const onFileSelect = (event: any) => {
    const file = event.target.files[0];
    file && onSelection(event.target.files[0]);
  };

  return (
    <TransitionWrapper open={open}>
      <div className={styles.attachmentModal}>
        <div className={styles.imageAttachment} onClick={handleImageSelection}>
          <input
            type="file"
            ref={imageRef}
            className={styles.fileInput}
            onChange={onImageSelect}
          />
          <ImageComponent
            src={Images.imageAttachmentIcon}
            width={52}
            height={52}
          />
        </div>
        <div className={styles.imageAttachment} onClick={handleFileSelection}>
          <input type="file" ref={fileRef} className={styles.fileInput} />
          <ImageComponent
            src={Images.docsAttachmentIcon}
            width={52}
            height={52}
            onChange={onFileSelect}
          />
        </div>
      </div>
    </TransitionWrapper>
  );
};
export default AttachmentModal;
