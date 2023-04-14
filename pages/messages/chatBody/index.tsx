import {
  SKELETON_VARIANT,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/enums";
import TipContainer from "@/components/tipContainer";
import Typography from "@/components/typography";
import ImageComponent from "@/components/image";
import Images from "@/public/assets/icons";
import moment from "moment";
import styles from "./chatBody.module.scss";
import { IChatBodyProps } from "./chatBody.types";
import { useEffect, useRef } from "react";
import React from "react";
import SkeletonLoader from "@/components/skeletonLoader";
import { skeletonArray } from "./chatBody.constants";

const ChatBody = (props: IChatBodyProps) => {
  const { messageList, isLoading } = props;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList, messagesEndRef]);
  return isLoading ? (
    <div className={styles.messageBodySkeleton}>
      {skeletonArray.map((element: any, index: number) => (
        <React.Fragment key={index}>
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.sentSkeletonSmall}
          />
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.sentSkeletonMedium}
          />
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.sentSkeleton}
          />

          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.receivedSkeleton}
          />
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.receivedSkeletonSmall}
          />
        </React.Fragment>
      ))}
    </div>
  ) : (
    <div className={styles.messageBody}>
      {messageList?.map((messageData: any, index: number) => {
        const messageType = messageData?.status ? "sent" : "received";
        const icon =
          messageData?.status === "read"
            ? Images.readIcon
            : messageData.status === "delivered"
            ? Images.deliveredIcon
            : Images.sentIcon;

        return (
          <React.Fragment key={index}>
            {!(
              moment.unix(messageData?.timestamp).format("DD/MM/YYYY") ===
              moment
                .unix(messageList[index - 1]?.timestamp)
                .format("DD/MM/YYYY")
            ) && (
              <div className={styles.date}>
                {moment.unix(messageData?.timestamp).calendar(null, {
                  sameDay: "[Today]",
                  nextDay: "[Tomorrow]",
                  nextWeek: "dddd",
                  lastDay: "[Yesterday]",
                  lastWeek: "DD MMM YYYY",
                  sameElse: "DD MMM YYYY",
                })}
              </div>
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
                <Typography variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}>
                  {messageData.message}
                </Typography>
                <div className={styles.time}>
                  <Typography
                    variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                    customStyle={styles.hint}
                  >
                    {moment.unix(messageData?.timestamp).format("hh:mm A")}
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
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
export default ChatBody;
