import { useState, useEffect, useCallback, ChangeEvent } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { db } from "@/db";
import socket from "@/socket";
import ChatBodySkeleton from "../chatBody/chatBodySkeleton";
import ChatBottom from "../chatBottom";
import ChatHeader from "../chatHeader";
import ChatBody from "../chatBody";
import styles from "./messageScreen.module.scss";
import { IMessageScreenProps } from "./messageScreen.types";
import { getTimeStamp } from "@/common/utils";
import { SOCKET_CONSTANTS, SOCKET_ROUTES } from "@/common/socketConstants";
import {
  getSentMessageData,
  resetUnreadCount,
  updateMessage,
} from "@/common/dbUtils";
import { MESSAGE_STATUS } from "@/common/enums";
import { setPhone } from "@/redux/slices/messageSlice";
import { useAppSelector } from "@/redux/hooks";
import { ISelectedFile } from "@/pages/messages/messages.types";

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
  const [selectedFile, setSelectedFile] = useState<ISelectedFile | null>(null);

  const dispatch = useDispatch();

  const handleMessageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleFileSelect = (fileData: any, type: string) => {
    setSelectedFile({ file: fileData, type });
  };
  const handleFileRemoval = () => {
    setSelectedFile(null);
  };

  const handleClick = async (message: string, whatsappId: string = "") => {
    const timestamp = getTimeStamp().toString();
    const messageId = `${uuid()}${timestamp}`;
    const newMessage = !selectedFile?.file?.name
      ? getSentMessageData({
          messageId,
          message,
          timestamp,
          messageType: "text",
          status: MESSAGE_STATUS.SENT,
          to: mobile,
          from: SOCKET_CONSTANTS.USER_ID,
        })
      : getSentMessageData({
          messageId,
          mediaUrl: selectedFile.file,
          timestamp,
          caption: message,
          messageType: selectedFile.type,
          status: MESSAGE_STATUS.SENDING,
          to: mobile,
          from: SOCKET_CONSTANTS.USER_ID,
        });
    setMessage("");
    selectedFile?.file?.name && setSelectedFile(null);
    whatsappId.length && db.messages.delete(whatsappId);
    await updateMessage({ ...newMessage, phone: mobile });
    !selectedFile?.file?.name
      ? socket.emit(SOCKET_ROUTES.SEND_PERSONAL_MESSAGE, {
          messaging_product: SOCKET_CONSTANTS.MESSAGING_PRODUCT,
          recipient_type: SOCKET_CONSTANTS.RECIPEINT_TYPE,
          to: mobile,
          type: "text",
          messageId: messageId,
          text: {
            body: message,
          },
        })
      : socket.emit(SOCKET_ROUTES.SEND_MEDIA, {
          file: selectedFile?.file,
          fileName: selectedFile.file.name,
          caption: message,
          messageId: messageId,
          type: selectedFile.type,
          contentType: selectedFile.file.type,
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
    socket.on(SOCKET_ROUTES.GET_MEDIA, async (data: any) => {
      const { id, receiverNumber, messageId, mediaUrl } = data;
      const result = await db.messages
        .where("messageId")
        .equals(messageId)
        .first();
      if (result) {
        await db.messages.update(messageId, {
          ...result,
          message: result?.message,
          messageId: id,
          mediaUrl: mediaUrl,
          status: MESSAGE_STATUS.SENT,
        });
      }
    });
  }, [mobile, props.isConnected]);

  useEffect(() => {
    const receiveMessage = async (data: any) => {
      const {
        from,
        wamid,
        messageType,
        timestamp,
        message,
        mediaUrl,
        caption,
      } = data;
      const newMessage = {
        messageId: wamid,
        message: message,
        timestamp: timestamp,
        messageType: messageType,
        mediaUrl: mediaUrl,
        to: SOCKET_CONSTANTS.USER_ID,
        caption: caption,
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
      socket.emit(SOCKET_ROUTES.JOIN_ROOM, {
        to: mobile,
        userId: SOCKET_CONSTANTS.USER_ID,
      });
      localStorage.setItem("phone", mobile);
      socket.on(SOCKET_ROUTES.ROOM_STATUS, (data) => {
        setRoomJoined(true);
      });
      resetUnreadCount(mobile);
    }
  }, [dispatch, mobile, props.isConnected]);

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
          onSend={handleClick}
          onFileSelection={handleFileSelect}
          selectedFile={selectedFile}
          handleMessageChange={handleMessageChange}
          message={message}
          onFileRemoval={handleFileRemoval}
          mobile={mobile}
          isLoading={!props.isConnected || !isRoomJoined}
        />
      </React.Fragment>
    </div>
  );
};
export default MessageScreen;
