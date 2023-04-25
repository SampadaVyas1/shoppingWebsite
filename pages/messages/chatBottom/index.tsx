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
import { SOCKET_ROUTES } from "@/common/socketConstants";
import socket from "@/socket";
import { useDispatch } from "react-redux";
import { sendMedia } from "@/services/common.service";
import { sagaActions } from "@/redux/constants";

const ChatBottom = (props: any) => {
  const { mobile, message, handleMessageChange } = props;
  const [showAttachmentModal, toggleAttachmentModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleClick = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>
  ) => {
    event.preventDefault();
    if (message.length) {
      props.onSend(message);
    }
  };

  const handleFileSelection = async (fileData: any) => {
    const fileBuffer = await fileData.arrayBuffer();
    const newMessage = {
      caption: message,
      type: "Image",
      recipient_type: "Individual",
      file: fileData,
      fileName: fileData?.name,
      to: mobile,
    };
    console.log(fileData);
    // socket.on(SOCKET_ROUTES.GET_MEDIA, (data) => console.log(data));
    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("type", "Image");
    formData.append("recipient_type", "Individual");
    formData.append("fileName", fileData?.name);
    formData.append("caption", message);
    formData.append("to", mobile);
    socket.emit(SOCKET_ROUTES.SEND_MEDIA, fileData);
    // dispatch({
    //   type: sagaActions.SEND_MEDIA_SAGA,
    //   formData: formData,
    // });
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
