import React, { useEffect } from "react";
import Image from "next/image";
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
import { SKELETON_VARIANT, TOOLTIP_POSITION } from "@/common/enums";
import TransitionWrapper from "@/components/transitionWrapper";
import { Popover, ArrowContainer } from "react-tiny-popover";
import MultiselectOptions from "@/components/select/multiselectOptions";
import { getAllTemplates } from "@/services/common.service";

const ChatBottom = (props: IChatBottomProps) => {
  const {
    mobile,
    message,
    handleMessageChange,
    selectedFile,
    onFileSelection,
    onSend,
    onFileRemoval,
    chatScreenRef,
  } = props;

  const [showAttachmentModal, toggleAttachmentModal] = useState<boolean>(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState<boolean>(false);

  const [templateList, setTemplateList] = useState<any>([]);

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

  const closePopup = () => {
    setIsTemplateOpen(false);
  };

  const closeAttachmentModal = () => toggleAttachmentModal(false);

  const handleTemplateIconClick = async () => {
    if (!isTemplateOpen) {
      const data = await getAllTemplates();
      console.log(data.data.data);
      setTemplateList(data.data.data.templates);
    }
    setIsTemplateOpen(!isTemplateOpen);
  };

  console.log(chatScreenRef?.current);

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
      <Popover
        isOpen={true}
        positions={[TOOLTIP_POSITION.TOP, TOOLTIP_POSITION.LEFT]}
        reposition={true}
        parentElement={
          chatScreenRef?.current ? chatScreenRef.current : undefined
        }
        onClickOutside={() => console.log("hello")}
        padding={10}
        content={({ position, childRect, popoverRect }) => (
          <TransitionWrapper open={isTemplateOpen}>
            <ArrowContainer
              position={position}
              childRect={childRect}
              popoverRect={popoverRect}
              arrowColor="white"
              arrowSize={12}
              arrowStyle={{ opacity: 1, zIndex: 2, top: "0.25rem" }}
              className={styles["popover-arrow-container"]}
              arrowClassName="popover-arrow"
            >
              <MultiselectOptions
                options={templateList?.map((templates: any) => ({
                  id: templates.id,
                  label: templates.name,
                }))}
                customStyle={styles.templateList}
                selectedValues={[]}
                searchable
              />
            </ArrowContainer>
          </TransitionWrapper>
        )}
      >
        <Image
          src={Images.templateIcon}
          className={
            isTemplateOpen ? `${styles.icon} ${styles.active}` : styles.icon
          }
          alt="template"
          width={24}
          height={24}
          onClick={handleTemplateIconClick}
        />
      </Popover>

      <ClickAwayListener handleClose={closeAttachmentModal}>
        <AttachmentModal
          open={showAttachmentModal}
          onSelection={handleFileSelection}
        />
        <ImageComponent
          src={Images.attachmentIcon}
          customClass={
            showAttachmentModal
              ? `${styles.icon} ${styles.active}`
              : styles.icon
          }
          onClick={handleAttachmentClick}
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
