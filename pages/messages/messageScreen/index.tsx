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
import { IMessageScreenProps } from "./messageScreen.types";
import { getTimeStamp } from "@/common/utils";
import { SOCKET_ROUTES } from "@/common/socketConstants";
import { resetUnreadCount, updateMessage } from "@/common/dbUtils";
import ChatBodySkeleton from "../chatBody/chatBodySkeleton";
import { MESSAGE_STATUS } from "@/common/enums";

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

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const handleClick = async (message: string, whatsappId: string = "") => {
    const timestamp = getTimeStamp();
    const messageId = `${uuid()}${timestamp}`;
    const newMessage = {
      messageId: messageId,
      message: message,
      timestamp: `${timestamp}`,
      messageType: "text",
      status: MESSAGE_STATUS.SENT,
      to: mobile,
      from: "11098",
    };
    setMessage("");
    whatsappId.length && db.messages.delete(whatsappId);
    await updateMessage({ ...newMessage, phone: mobile });
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
      const { id, receiverNumber, messageId } = data;
      const result = await db.messages
        .where("messageId")
        .equals(messageId)
        .first();
      if (result) {
        await db.messages.update(messageId, {
          ...result,
          message: result?.message,
          messageId: id,
        });
      }
    });
  }, []);

  useEffect(() => {
    const receiveMessage = async (data: any) => {
      const { from, wamid, messageType, timestamp, message } = data;
      const newMessage = {
        messageId: wamid,
        message: message,
        timestamp: timestamp,
        messageType: messageType,
        to: "11098",
        from: from,
      };
      await updateMessage({ ...newMessage, phone: from });
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
      db.transaction("rw", db.conversations, db.messages, async () => {
        const messages = await db.messages
          .where("phone")
          .equals(mobile)
          .toArray();
        const syncObject = {
          [mobile]: {
            ta: 1092,
            messages: messages,
          },
        };
        console.log(syncObject);
      });
      socket.emit(SOCKET_ROUTES.JOIN_ROOM, { to: mobile, userId: "11098" });
      localStorage.setItem("phone", mobile);
      socket.on(SOCKET_ROUTES.ROOM_STATUS, (data) => {
        setRoomJoined(true);
      });
      resetUnreadCount(mobile);
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
        {!props.isConnected || !isRoomJoined ? (
          <ChatBodySkeleton />
        ) : (
          <ChatBody
            phone={mobile}
            onRetry={handleClick}
            isLoading={!props.isConnected || !isRoomJoined}
          />
        )}
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
