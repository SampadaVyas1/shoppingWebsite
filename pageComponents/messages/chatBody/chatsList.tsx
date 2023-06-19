import React, { useCallback } from "react";
import Images from "@/public/assets/icons";
import ImageComponent from "@/components/imageComponent";
import TipContainer from "@/components/tipContainer";
import styles from "./chatBody.module.scss";
import { MESSAGE_STATUS_VARIANT } from "@/common/constants/socketConstants";
import { ISentMessage } from "@/common/types";
import {
  TOOLTIP_POSITION,
  MESSAGE_TYPES,
  TYPOGRAPHY_VARIANT,
  MESSAGE_STATUS,
} from "@/common/types/enums";
import {
  getStatusImage,
  isSameDay,
  getCurrentDay,
  formatTime,
} from "@/common/utils";
import Tag from "@/components/tag";
import Typography from "@/components/typography";
import { IChatListProps } from "./chatBody.types";

const ChatList = ({
  chats,
  onRetry,
  handleMediaDownload,
  setSelectedImage,
}: IChatListProps) => {
  const getMediaUrl = (media: string | File) => {
    return typeof media !== "string" ? URL.createObjectURL(media) : media;
  };

  const handleRetry = useCallback(
    (message: string, messageId: string) => () => {
      onRetry(message, messageId);
    },
    [onRetry]
  );

  const renderTypography = (
    text: string | JSX.Element,
    className: string,
    variant: TYPOGRAPHY_VARIANT
  ) => (
    <Typography variant={variant} customStyle={className}>
      {text}
    </Typography>
  );

  const renderTag = (label: string, onClick?: () => void) => (
    <Tag
      tagValue={{
        id: "1",
        label: label,
      }}
      onClick={onClick}
    />
  );

  return (
    <React.Fragment>
      {chats?.map((messageData: ISentMessage, index: number) => {
        const {
          status,
          timestamp,
          message,
          messageId,
          caption,
          mediaUrl,
          messageType: type,
        } = messageData;
        const messageType = status
          ? MESSAGE_STATUS_VARIANT.SENT
          : MESSAGE_STATUS_VARIANT.RECEIVED;
        const icon = getStatusImage(status!);
        return (
          <React.Fragment key={index}>
            {!isSameDay(timestamp, chats[index - 1]?.timestamp) && (
              <div className={styles.date}>{getCurrentDay(timestamp)}</div>
            )}

            <TipContainer
              position={
                messageData?.status
                  ? TOOLTIP_POSITION.RIGHT
                  : TOOLTIP_POSITION.LEFT
              }
              variant={messageType}
              customStyles={styles[messageType]}
            >
              <div className={styles.messageContent}>
                {mediaUrl && type === MESSAGE_TYPES.IMAGE && (
                  // <ImageComponent
                  //   src={getMediaUrl(mediaUrl)}
                  //   onClick={() => setSelectedImage(getMediaUrl(mediaUrl))}
                  //   fallbackText="Image"
                  //   customClass={styles.chatImage}
                  //   width={200}
                  //   height={200}
                  // />
                  <></>
                )}

                {type === MESSAGE_TYPES.DOCUMENT &&
                  (typeof mediaUrl !== "string"
                    ? renderTag(mediaUrl?.name!)
                    : renderTag(
                        caption ||
                          mediaUrl!.substring(mediaUrl?.lastIndexOf("/") + 1),
                        () => handleMediaDownload(mediaUrl)
                      ))}
                {message &&
                  renderTypography(
                    message,
                    styles.messageText,
                    TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR
                  )}
                {type !== MESSAGE_TYPES.DOCUMENT &&
                  caption &&
                  renderTypography(
                    caption,
                    styles.messageText,
                    TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR
                  )}
                <div className={styles.time}>
                  {renderTypography(
                    formatTime(timestamp),
                    styles.hint,
                    TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR
                  )}
                  {messageType !== MESSAGE_STATUS_VARIANT.RECEIVED &&
                    (messageData.status === MESSAGE_STATUS.SENDING ? (
                      <ImageComponent
                        src={Images.loaderSpinner}
                        className={styles.spinner}
                      />
                    ) : (
                      <ImageComponent
                        src={icon}
                        customClass={styles.icon}
                        width={20}
                        height={20}
                      />
                    ))}
                </div>
              </div>
            </TipContainer>
            {status === MESSAGE_STATUS.FAILED &&
              renderTypography(
                <React.Fragment>
                  Failed to send.
                  <span
                    className={styles.retry}
                    onClick={handleRetry(message!, messageId)}
                  >
                    Tap to retry.
                  </span>
                </React.Fragment>,
                styles.failedError,
                TYPOGRAPHY_VARIANT.ERROR
              )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
export default ChatList;
