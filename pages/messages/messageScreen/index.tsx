import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import ChatBottom from "../chatBottom";
import ChatHeader from "../chatHeader";
import styles from "./messageScreen.module.scss";
import TipContainer from "@/components/tipContainer";
import ImageComponent from "@/components/image";
import { TOOLTIP_POSITION, TYPOGRAPHY_VARIANT } from "@/common/enums";
import Typography from "@/components/typography";
import moment from "moment";
import Images from "@/public/assets/icons";
import socket from "@/socket";
import { useState, useEffect, useRef } from "react";
import React from "react";
import Loader from "@/components/loader";
import { getDataFromLocalStorage } from "@/common/utils";

const MessageScreen = (props: any) => {
  const {
    name,
    designation,
    techStack,
    interviewStatus,
    profileImage,
    mobile,
  } = props.candidateData;
  const messageList = useLiveQuery(() => db?.messages?.toArray());

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const mobileNumber = getDataFromLocalStorage("mobile");

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      setIsConnected(false);
      socket.disconnect();
    };
  }, [mobileNumber]);

  useEffect(() => {
    if (socket.on) {
      socket.on("session", (data: any) => {
        setIsConnected(true);
        setUserId(data);
        socket.emit("join", `${data.mobile}${data.userId}`);
      });
    }
  }, [mobileNumber]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList, mobile, messagesEndRef]);

  return (
    <div className={styles.messageScreen}>
      {!isConnected || getDataFromLocalStorage("mobile") !== mobile ? (
        <Loader />
      ) : (
        <React.Fragment>
          <ChatHeader
            name={name}
            designation={designation}
            techStack={techStack}
            interviewStatus={interviewStatus}
            profileImage={profileImage}
          />
          <div className={styles.messageBody}>
            {messageList
              ?.sort(function (first: any, second: any) {
                return parseInt(first.timestamp) - parseInt(second.timestamp);
              })
              ?.map((messageData: any, index: number) => {
                const messageType = messageData?.status ? "sent" : "received";
                const icon =
                  messageData?.status === "sent"
                    ? Images.sentIcon
                    : messageData.status === "delivered"
                    ? Images.deliveredIcon
                    : Images.readIcon;
                return (
                  <TipContainer
                    position={
                      messageData?.status
                        ? TOOLTIP_POSITION.RIGHT
                        : TOOLTIP_POSITION.LEFT
                    }
                    key={index}
                    variant={messageType}
                    customStyles={styles[messageType]}
                  >
                    <div className={styles.messageContent}>
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                      >
                        {messageData.message}
                      </Typography>
                      <div className={styles.time}>
                        <Typography
                          variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                          customStyle={styles.hint}
                        >
                          {moment
                            .unix(parseInt(messageData?.timestamp))
                            .format("hh:mm A")}
                        </Typography>
                        {messageData.status && (
                          <ImageComponent
                            src={icon}
                            customClass={styles.icon}
                          />
                        )}
                      </div>
                    </div>
                  </TipContainer>
                );
              })}
            <div ref={messagesEndRef} />
          </div>
          <ChatBottom userId={userId} />
        </React.Fragment>
      )}
    </div>
  );
};
export default MessageScreen;
