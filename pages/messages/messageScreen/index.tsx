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
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import Loader from "@/components/loader";
import { getDataFromLocalStorage } from "@/common/utils";
import ChatBody from "../chatBody";

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
    if (socket.connected) {
      setIsConnected(true);
    }
    if (!socket.connected) {
      socket.connect();
      socket.on("connect", () => {
        setIsConnected(true);
        console.log(socket.id);
      });
      socket.on("disconnect", () => {
        setIsConnected(false);
        console.log("disconnected");
      });
    }
    return () => {
      setIsConnected(false);
      socket.disconnect();
    };
  }, [mobile]);

  return (
    <div className={styles.messageScreen}>
      <React.Fragment>
        <ChatHeader
          name={name}
          designation={designation}
          techStack={techStack}
          interviewStatus={interviewStatus}
          profileImage={profileImage}
          isLoading={!isConnected}
        />
        <ChatBody messageList={messageList} isLoading={!isConnected} />
        <ChatBottom userId={userId} mobile={mobile} isLoading={!isConnected} />
      </React.Fragment>
    </div>
  );
};
export default MessageScreen;
