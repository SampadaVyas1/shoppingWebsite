import {
  ChangeEventHandler,
  LegacyRef,
  MouseEventHandler,
  useRef,
} from "react";
import ImageComponent from "../imageComponent";
import TransitionWrapper from "../transitionWrapper";
import styles from "./attachmentModal.module.scss";
import Images from "@/public/assets/icons";
import { IAttachmentModalProps } from "./attachmentModal.types";
import { ATTACHMENT_MODAL } from "@/common/constants";
import { MESSAGE_TYPES } from "@/common/types/enums";

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
    const [file, ...otherElements] = event.target.files;
    file && onSelection(file, MESSAGE_TYPES.IMAGE);
  };

  const onFileSelect = (event: any) => {
    const [file, ...otherElements] = event.target.files;
    file && onSelection(file, MESSAGE_TYPES.DOCUMENT);
  };

  const renderAttachmentOption = (
    onChange: ChangeEventHandler<HTMLInputElement>,
    onClick: MouseEventHandler<HTMLDivElement>,
    ref: LegacyRef<HTMLInputElement>,
    accept: string,
    image: string
  ) => (
    <div className={styles.imageAttachment} onClick={onClick}>
      <input
        type="file"
        ref={ref}
        accept={accept}
        className={styles.fileInput}
        onChange={onChange}
      />
      <ImageComponent src={image} width={52} height={52} />
    </div>
  );

  return (
    <TransitionWrapper open={open}>
      <div className={styles.attachmentModal}>
        {renderAttachmentOption(
          onImageSelect,
          handleImageSelection,
          imageRef,
          ATTACHMENT_MODAL.IMAGES_TYPES,
          Images.imageAttachmentIcon
        )}
        {renderAttachmentOption(
          onFileSelect,
          handleFileSelection,
          fileRef,
          ATTACHMENT_MODAL.DOCUMENT_TYPE,
          Images.docsAttachmentIcon
        )}
      </div>
    </TransitionWrapper>
  );
};
export default AttachmentModal;
