import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import { v4 as uuid } from "uuid";
import ChatBottom from "../chatBottom";
import ChatHeader from "../chatHeader";
import styles from "./messageScreen.module.scss";
import socket from "@/socket";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import ChatBody from "../chatBody";
import { ISentMessage } from "@/common/types";
import { IMessageScreenProps } from "./messageScreen.types";
import { getTimeStamp } from "@/common/utils";
import { SOCKET_ROUTES } from "@/common/socketConstants";
import { addMessage } from "@/common/dbUtils";

const MessageScreen = (props: IMessageScreenProps) => {
  const {
    name,
    designation,
    techStack,
    interviewStatus,
    profileImage,
    mobile,
  } = props.candidateData;

  const [isRoomJoined, setRoomJoined] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [userId, setUserId] = useState<string>("11098");

  const messageList = useLiveQuery(() => {
    return db.conversations.toArray();
  });

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const updateMessages = async (
    phone: string,
    updatedMessage: ISentMessage[]
  ) => {
    const result = await db.conversations.where("id").equals(phone).first();

    if (result !== undefined) {
      try {
        const updatedMessages = await db?.conversations.put({
          ...result,
          messages: updatedMessage,
        });
        console.log(updatedMessages);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClick = async (message: string) => {
    const timestamp = getTimeStamp();
    const messageId = `${uuid()}${timestamp}`;
    const newMessage = {
      messageId: messageId,
      message: message,
      timestamp: `${timestamp}`,
      messageType: "text",
      status: "sent",
      to: mobile,
      from: "11098",
    };
    setMessage("");
    await addMessage(newMessage, mobile);
    socket.emit(SOCKET_ROUTES.SEND_PERSONAL_MESSAGE, {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: mobile,
      type: "text",
      messageId: messageId,
      text: {
        body: message,
      },
    });
  };
  useEffect(() => {
    socket.on(SOCKET_ROUTES.GET_MESSAGE, async (data: any) => {
      const currentMessage = messageList?.find(
        (message) => message.id === data.contacts[0].input
      );

      const updatedId = currentMessage?.messages?.map((message) => {
        if (message.messageId === data.messageId) {
          console.log("matched");
          return { ...message, messageId: data.messages[0].id };
        } else {
          return message;
        }
      });

      !!updatedId && (await updateMessages(data.contacts[0].input, updatedId));
    });
  }, [messageList]);

  useEffect(() => {
    const receiveMessage = (data: any) => {
      const { from, wamid, messageType, timestamp, message } = data;
      const newMessage = {
        messageId: wamid,
        message: message,
        timestamp: timestamp,
        messageType: messageType,
        to: "11098",
        from: from,
      };
      addMessage(newMessage, mobile);
    };
    if (socket.on) {
      socket.on(SOCKET_ROUTES.PERSONAL_MESSAGE, receiveMessage);
    }
    return () => {
      socket.off(SOCKET_ROUTES.PERSONAL_MESSAGE, receiveMessage);
    };
  }, [mobile, props.userId]);

  useEffect(() => {
    if (props.isConnected) {
      setRoomJoined(false);
      socket.emit("joinRoom", { to: mobile, userId: "11098" });
      setRoomJoined(true);
    }
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
          isLoading={!props.isConnected || !isRoomJoined}
        />
        <ChatBody
          messageList={
            messageList?.find((data) => data.id === mobile)?.messages
          }
          isLoading={!props.isConnected || !isRoomJoined}
        />
        <ChatBottom
          userId={userId}
          onSend={handleClick}
          handleMessageChange={handleMessageChange}
          message={message}
          mobile={mobile}
          isLoading={!props.isConnected || !isRoomJoined}
        />
      </React.Fragment>
    </div>
  );
};
export default MessageScreen;
