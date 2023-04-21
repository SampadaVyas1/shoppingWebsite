import {
  MESSAGE_STATUS,
  SKELETON_VARIANT,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/enums";
import TipContainer from "@/components/tipContainer";
import Typography from "@/components/typography";
import ImageComponent from "@/components/imageComponent";
import Images from "@/public/assets/icons";
import moment from "moment";
import styles from "./chatBody.module.scss";
import { IChatBodyProps } from "./chatBody.types";
import { useEffect, useRef, useState } from "react";
import React from "react";
import SkeletonLoader from "@/components/skeletonLoader";
import { skeletonArray } from "./chatBody.constants";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import { getMessages, sortMessages } from "@/common/dbUtils";
import { ISentMessage } from "@/common/types";
import { formatTime, getCurrentDay, isSameDay } from "@/common/utils";

const ChatBody = (props: IChatBodyProps) => {
  const { phone } = props;

  const messageListData = useLiveQuery(() => {
    return db.messages.where("phone").equals(phone).toArray();
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageListData, messagesEndRef]);

  const { readIcon, sentIcon, deliveredIcon } = Images;

  return (
    <div className={styles.messageBody}>
      {!!messageListData &&
        sortMessages(messageListData)?.map(
          (messageData: ISentMessage, index: number) => {
            const { status, timestamp, message } = messageData;
            const messageType = status ? "sent" : "received";
            const icon =
              status === MESSAGE_STATUS.READ
                ? readIcon
                : status === MESSAGE_STATUS.DELIVERED
                ? deliveredIcon
                : sentIcon;

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
                      {messageData.status && (
                        <ImageComponent
                          src={icon}
                          customClass={styles.icon}
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                  </div>
                </TipContainer>
              </React.Fragment>
            );
          }
        )}
      <div ref={messagesEndRef} />
    </div>
  );
};
export default ChatBody;
