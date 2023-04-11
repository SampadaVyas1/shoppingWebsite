import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import ChatBottom from "../chatBottom";
import ChatHeader from "../chatHeader";
import styles from "./messageScreen.module.scss";
import socket from "@/socket";
import { useState, useEffect, useRef } from "react";
import React from "react";
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

  const [userId, setUserId] = useState<string>("");

  console.log(socket.id);

  useEffect(() => {
    if (props.isConnected) {
      socket.emit("joinRoom", { to: mobile, userId: "11098" });
    }
    console.log("messages", props.isConnected);
  }, [mobile, props.isConnected]);

  return (
    <div className={styles.messageScreen}>
      <React.Fragment>
        <ChatHeader
          name={name}
          designation={designation}
          techStack={techStack}
          interviewStatus={interviewStatus}
          profileImage={profileImage}
          isLoading={!props.isConnected}
        />
        <ChatBody messageList={messageList} isLoading={!props.isConnected} />
        <ChatBottom
          userId={userId}
          mobile={mobile}
          isLoading={!props.isConnected}
        />
      </React.Fragment>
    </div>
  );
};
export default MessageScreen;
