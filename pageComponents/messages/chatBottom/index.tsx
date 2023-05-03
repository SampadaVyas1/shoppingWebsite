import React from "react";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import ImageComponent from "@/components/imageComponent";
import InputBox from "@/components/inputBox";
import SkeletonLoader from "@/components/skeletonLoader";
import AttachmentModal from "@/components/attachmentModal";
import ClickAwayListener from "@/components/clickAway";
import Container from "@/components/container";
import Tag from "@/components/tag";
import styles from "./chatBottom.module.scss";
import Images from "@/public/assets/icons";
import { IChatBottomProps } from "./chatBottom.types";
import { SKELETON_VARIANT } from "@/common/enums";

const ChatBottom = (props: IChatBottomProps) => {
  const {
    mobile,
    message,
    handleMessageChange,
    selectedFile,
    onFileSelection,
    onSend,
    onFileRemoval,
  } = props;

  const [showAttachmentModal, toggleAttachmentModal] = useState<boolean>(false);

  const handleClick = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>
  ) => {
    event.preventDefault();
    if (message.length || selectedFile?.file?.name) {
      onSend(message);
    }
  };

  const handleFileSelection = async (fileData: any, type: string) => {
    onFileSelection(fileData, type);
    handleCloseAttachmentModal();
  };

  const handleAttachmentClick = () => {
    toggleAttachmentModal(!showAttachmentModal);
  };

  const handleCloseAttachmentModal = () => {
    showAttachmentModal && toggleAttachmentModal(false);
  };

  return props.isLoading ? (
    <div className={styles.chatBottom}>
      <SkeletonLoader
        type={SKELETON_VARIANT.TEXT_SMALL}
        customClass={styles.skeletonIcon}
      />
      <SkeletonLoader
        type={SKELETON_VARIANT.TEXT_SMALL}
        customClass={styles.skeletonIcon}
      />
      <SkeletonLoader
        type={SKELETON_VARIANT.TEXT_LARGE}
        customClass={styles.skeletonBox}
      />
      <SkeletonLoader
        type={SKELETON_VARIANT.TEXT_SMALL}
        customClass={styles.skeletonIcon}
      />
    </div>
  ) : (
    <form className={styles.chatBottom} onSubmit={handleClick}>
      <ImageComponent src={Images.templateIcon} customClass={styles.icon} />
      <ClickAwayListener handleClose={handleCloseAttachmentModal}>
        <ImageComponent
          src={Images.attachmentIcon}
          customClass={
            showAttachmentModal
              ? `${styles.icon} ${styles.active}`
              : styles.icon
          }
          onClick={handleAttachmentClick}
        />
        <AttachmentModal
          open={showAttachmentModal}
          onSelection={handleFileSelection}
        />
      </ClickAwayListener>
      {selectedFile?.file?.name && (
        <Container customClass={styles.imagePreview}>
          {selectedFile.file.type.includes("image") ? (
            <ImageComponent
              src={URL.createObjectURL(selectedFile.file)}
              customClass={styles.attachedImage}
            />
          ) : (
            <Tag
              active
              tagValue={{ id: uuid(), label: selectedFile.file.name }}
              customClass={styles.fileName}
            />
          )}
          <ImageComponent
            src={Images.crossIconBlack}
            customClass={styles.closeIcon}
            onClick={onFileRemoval}
          />
        </Container>
      )}
      <InputBox
        placeholder="Enter message"
        value={message}
        customClass={styles.input}
        onChange={handleMessageChange}
      />
      <ImageComponent
        src={Images.sendIcon}
        customClass={
          message?.length || selectedFile?.file?.name
            ? `${styles.icon} ${styles.active}`
            : styles.icon
        }
        onClick={handleClick}
      />
    </form>
  );
};
export default React.memo(ChatBottom);
