import React from "react";
import ImageComponent from "@/components/imageComponent";
import InputBox from "@/components/inputBox";
import Images from "@/public/assets/icons";
import styles from "./chatBottom.module.scss";
import { FormEvent, useState } from "react";
import { SKELETON_VARIANT } from "@/common/enums";
import SkeletonLoader from "@/components/skeletonLoader";
import AttachmentModal from "@/components/attachmentModal";
import ClickAwayListener from "@/components/clickAway";

const ChatBottom = (props: any) => {
  const { mobile, message, handleMessageChange } = props;
  const [showAttachmentModal, toggleAttachmentModal] = useState<boolean>(false);

  const handleClick = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>
  ) => {
    event.preventDefault();
    if (message.length) {
      props.onSend(message);
    }
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
        <AttachmentModal open={showAttachmentModal} />
      </ClickAwayListener>
      <InputBox
        placeholder="Enter message"
        value={message}
        customClass={styles.input}
        handleChange={handleMessageChange}
      />
      <ImageComponent
        src={Images.sendIcon}
        customClass={
          message.length ? `${styles.icon} ${styles.active}` : styles.icon
        }
        onClick={handleClick}
      />
    </form>
  );
};
export default React.memo(ChatBottom);
