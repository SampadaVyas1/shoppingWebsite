import React from "react";
import ImageComponent from "@/components/image";
import InputBox from "@/components/inputBox";
import Images from "@/public/assets/icons";
import styles from "./chatBottom.module.scss";
import { FormEvent, useState } from "react";
import { SKELETON_VARIANT } from "@/common/enums";
import SkeletonLoader from "@/components/skeletonLoader";

const ChatBottom = (props: any) => {
  const { mobile, message, handleMessageChange } = props;

  const handleClick = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>
  ) => {
    event.preventDefault();
    props.onSend(message);
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
      <ImageComponent src={Images.attachmentIcon} customClass={styles.icon} />
      <InputBox
        placeholder="Enter message"
        value={message}
        customClass={styles.input}
        handleChange={handleMessageChange}
      />
      <ImageComponent
        src={Images.sendIcon}
        customClass={styles.icon}
        onClick={handleClick}
      />
    </form>
  );
};
export default React.memo(ChatBottom);
