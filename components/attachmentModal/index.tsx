import Images from "@/public/assets/icons";
import ImageComponent from "../imageComponent";
import styles from "./attachmentModal.module.scss";
import { useRef } from "react";
import TransitionWrapper from "../transitionWrapper";

const AttachmentModal = ({ open }: any) => {
  const imageRef = useRef<any>(null);
  const fileRef = useRef<any>(null);

  const handleImageSelection = () => {
    imageRef.current.click();
  };
  const handleFileSelection = () => {
    fileRef.current.click();
  };

  return (
    <TransitionWrapper open={open}>
      <div className={styles.attachmentModal}>
        <div className={styles.imageAttachment} onClick={handleImageSelection}>
          <input type="file" ref={imageRef} className={styles.fileInput} />
          <ImageComponent
            src={Images.docsAttachmentIcon}
            width={52}
            height={52}
          />
        </div>
        <div className={styles.imageAttachment} onClick={handleFileSelection}>
          <input type="file" ref={fileRef} className={styles.fileInput} />
          <ImageComponent
            src={Images.imageAttachmentIcon}
            width={52}
            height={52}
          />
        </div>
      </div>
    </TransitionWrapper>
  );
};
export default AttachmentModal;
