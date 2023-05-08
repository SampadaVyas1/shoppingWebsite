import React, { ChangeEvent, useEffect } from "react";
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
import {
  BUTTON_VARIANT,
  SKELETON_VARIANT,
  TOOLTIP_POSITION,
} from "@/common/enums";
import TransitionWrapper from "@/components/transitionWrapper";
import { Popover, ArrowContainer } from "react-tiny-popover";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { sagaActions } from "@/redux/constants";
import Options from "@/components/select/options";
import Loader from "@/components/loader";
import { IOptionType } from "@/common/types";
import { formatTemplateHeader, formatTemplateName } from "@/common/utils";
import TemplateCard from "@/components/templateCard";
import Button from "@/components/button";

const ChatBottom = (props: IChatBottomProps) => {
  const {
    candidateName,
    handleMessageChange,
    selectedFile,
    onFileSelection,
    onSend,
    onFileRemoval,
    chatScreenRef,
    onTemplateSend,
  } = props;

  const { isLoading, templates } = useAppSelector((state) => state.messages);
  const dispatch = useDispatch();

  const [showAttachmentModal, toggleAttachmentModal] = useState<boolean>(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState<boolean>(false);

  const [selectedTemplate, setSelectedTemplate] = useState<any>("");

  const [message, setMessage] = useState<string>("");

  const handleClick = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>
  ) => {
    event.preventDefault();
    if (message.length || selectedFile?.file?.name) {
      onSend(message);
      setMessage("");
    }
  };

  const handleTemplateSend = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>
  ) => {
    event.preventDefault();
    selectedTemplate && onTemplateSend && onTemplateSend(selectedTemplate);
    onTemplateClose();
  };

  const onMessageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
    handleMessageChange(event);
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

  const handleTemplateSelect = (value: IOptionType) => {
    const selectedValue = templates.find(
      (template: any) => template.id === value.id
    );
    setSelectedTemplate(selectedValue);
    setIsTemplateOpen(false);
  };

  const onTemplateClose = () => {
    setSelectedTemplate("");
    setMessage("");
  };

  const handleTemplateIconClick = async () => {
    if (!isTemplateOpen) {
      dispatch({
        type: sagaActions.GET_ALL_TEMPLATES,
      });
    }
    setIsTemplateOpen(!isTemplateOpen);
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
      {!selectedTemplate && (
        <React.Fragment>
          <Popover
            isOpen={true}
            positions={[TOOLTIP_POSITION.TOP, TOOLTIP_POSITION.LEFT]}
            reposition={true}
            parentElement={
              chatScreenRef?.current ? chatScreenRef.current : undefined
            }
            onClickOutside={closePopup}
            padding={10}
            content={({ position, childRect, popoverRect }) => (
              <TransitionWrapper open={isTemplateOpen}>
                <ArrowContainer
                  position={position}
                  childRect={childRect}
                  popoverRect={popoverRect}
                  arrowColor="white"
                  arrowSize={12}
                  arrowStyle={{ opacity: 1, zIndex: 2 }}
                  className={styles["popover-arrow-container"]}
                  arrowClassName="popover-arrow"
                >
                  {isLoading ? (
                    <div className={styles.templateList}>
                      <Loader />
                    </div>
                  ) : (
                    <Options
                      options={templates?.map((template: any) => ({
                        id: template.id,
                        label: formatTemplateName(template.name!),
                      }))}
                      selectedValue={null}
                      onSelect={handleTemplateSelect}
                      customStyle={styles.templateList}
                      searchable
                    />
                  )}
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
            onChange={onMessageChange}
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
        </React.Fragment>
      )}

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
      {!!selectedTemplate && (
        <Container
          customClass={`${styles.imagePreview} ${styles.templatePreview}`}
        >
          <TemplateCard
            imageUrl={
              selectedTemplate?.components[0]?.example?.header_handle[0]
            }
            header={
              selectedTemplate?.components[0]?.text
                ? formatTemplateHeader(
                    selectedTemplate?.components[0]?.text,
                    candidateName
                  )
                : ""
            }
            description={selectedTemplate?.components[1]?.text}
            templateName={selectedTemplate?.name}
          />
          <ImageComponent
            src={Images.crossIconBlack}
            customClass={styles.closeIcon}
            onClick={onTemplateClose}
          />
          <div className={styles.sendButton}>
            <ImageComponent
              src={Images.sendIcon}
              customClass={
                selectedTemplate
                  ? `${styles.sendIcon} ${styles.active}`
                  : styles.sendIcon
              }
              onClick={handleTemplateSend}
            />
          </div>
        </Container>
      )}
    </form>
  );
};
export default React.memo(ChatBottom);
