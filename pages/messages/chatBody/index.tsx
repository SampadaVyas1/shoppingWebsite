import React from "react";
import { useCallback, useEffect, useRef } from "react";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import TipContainer from "@/components/tipContainer";
import Typography from "@/components/typography";
import ImageComponent from "@/components/imageComponent";
import Images from "@/public/assets/icons";
import styles from "./chatBody.module.scss";
import { IChatBodyProps } from "./chatBody.types";
import { sortMessages } from "@/common/dbUtils";
import { ISentMessage } from "@/common/types";
import {
  formatTime,
  getCurrentDay,
  getStatusImage,
  isSameDay,
} from "@/common/utils";
import {
  MESSAGE_STATUS,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/enums";
import { MESSAGE_STATUS_VARIANT } from "@/common/socketConstants";

const ChatBody = (props: IChatBodyProps) => {
  const { phone, onRetry } = props;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messageListData = useLiveQuery(() => {
    return db.messages.where("phone").equals(phone).toArray();
  });

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRetry = useCallback(
    (message: string, messageId: string) => () => {
      onRetry(message, messageId);
    },
    [onRetry]
  );

  useEffect(() => {
    scrollToBottom();
  }, [messageListData, messagesEndRef]);

  return (
    <div className={styles.messageBody}>
      {!!messageListData &&
        sortMessages(messageListData)?.map(
          (messageData: ISentMessage, index: number) => {
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
                {!isSameDay(
                  timestamp,
                  messageListData[index - 1]?.timestamp
                ) && (
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
                    {mediaUrl && type !== "document" && (
                      <ImageComponent
                        src={
                          typeof mediaUrl !== "string"
                            ? URL.createObjectURL(mediaUrl)
                            : Images.rectangle
                        }
                        width={200}
                        height={200}
                      />
                    )}
                    {typeof mediaUrl !== "string" && type === "document" && (
                      <div>{mediaUrl?.name!}</div>
                    )}
                    <Typography
                      variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                      customStyle={styles.messageText}
                    >
                      {caption}
                    </Typography>
                    <Typography
                      variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                      customStyle={styles.messageText}
                    >
                      {message}
                    </Typography>
                    <div className={styles.time}>
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                        customStyle={styles.hint}
                      >
                        {formatTime(timestamp)}
                      </Typography>
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
                {status === MESSAGE_STATUS.FAILED && (
                  <Typography
                    variant={TYPOGRAPHY_VARIANT.ERROR}
                    customStyle={styles.failedError}
                  >
                    Failed to send.
                    <span
                      className={styles.retry}
                      onClick={handleRetry(message!, messageId)}
                    >
                      Tap to retry.
                    </span>
                  </Typography>
                )}
              </React.Fragment>
            );
          }
        )}
      <div ref={messagesEndRef} />
    </div>
  );
};
export default ChatBody;
