import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
  Fragment,
} from "react";
import { v4 as uuid } from "uuid";
import { db } from "@/db";
import socket from "@/socket";
import ChatBodySkeleton from "../chatBody/chatBodySkeleton";
import ChatBottom from "../chatBottom";
import ChatHeader from "../chatHeader";
import ChatBody from "../chatBody";
import styles from "./messageScreen.module.scss";
import { IMessageScreenProps } from "./messageScreen.types";
import {
  formatTemplateData,
  formatTemplateHeader,
  getTimeStamp,
  setDataInSessionStorage,
} from "@/common/utils";
import { SOCKET_CONSTANTS, SOCKET_ROUTES } from "@/common/socketConstants";
import {
  deleteMessageByMessageId,
  getMessageFromMessageId,
  getSentMessageData,
  resetUnreadCount,
  updateMessage,
} from "@/common/dbUtils";
import { MESSAGE_STATUS, MESSAGE_TYPES } from "@/common/types/enums";
import { ISelectedFile } from "@/pages/messages/messages.types";
import { useAppSelector } from "@/redux/hooks";

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
  const chatScreenRef = useRef<HTMLDivElement>(null);

  const { employeeId } = useAppSelector((state) => state.login.userDetails);

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
          messageType: MESSAGE_TYPES.TEXT,
          status: MESSAGE_STATUS.SENT,
          to: mobile,
          from: `${employeeId}`,
        })
      : getSentMessageData({
          messageId,
          mediaUrl: selectedFile.file,
          timestamp,
          caption: message,
          messageType: selectedFile.type,
          status: MESSAGE_STATUS.SENDING,
          to: mobile,
          from: `${employeeId}`,
        });
    setMessage("");
    selectedFile?.file?.name && setSelectedFile(null);
    whatsappId.length && deleteMessageByMessageId(whatsappId);
    await updateMessage({ ...newMessage, phone: mobile });
    !selectedFile?.file?.name
      ? socket.emit(SOCKET_ROUTES.SEND_PERSONAL_MESSAGE, {
          messaging_product: SOCKET_CONSTANTS.MESSAGING_PRODUCT,
          recipient_type: SOCKET_CONSTANTS.RECIPIENT_TYPE,
          to: mobile,
          type: MESSAGE_TYPES.TEXT,
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

  const handleTemplateSend = async (template: any) => {
    const timestamp = getTimeStamp().toString();
    const messageId = `${uuid()}${timestamp}`;
    const templateData = formatTemplateData(
      template,
      name,
      messageId,
      timestamp
    );
    socket.emit(SOCKET_ROUTES.SEND_TEMPLATE, templateData);
    const [header, body, ...otherElements] = template?.components ?? [];
    const [parameters, ...restElements] = header?.example?.header_handle ?? [];
    const newMessage = getSentMessageData({
      messageId,
      mediaUrl: parameters,
      timestamp,
      message: formatTemplateHeader(header?.text, name),
      caption: body?.text,
      messageType: MESSAGE_TYPES.IMAGE,
      status: MESSAGE_STATUS.SENDING,
      to: mobile,
      from: `${employeeId}`,
    });
    await updateMessage({ ...newMessage, phone: mobile });
  };

  useEffect(() => {
    socket.on(SOCKET_ROUTES.GET_MESSAGE, async (data: any) => {
      const { id, receiverNumber, messageId } = data;
      const result = await getMessageFromMessageId(messageId);
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
      const { id, receiverNumber, messageId, mediaUrl, fileName } = data;
      const result = await getMessageFromMessageId(messageId);
      if (result) {
        await db.messages.update(messageId, {
          ...result,
          message: result?.message,
          messageId: id,
          mediaUrl: mediaUrl,
          fileName: fileName,
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
        to: `${employeeId}`,
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
    if (props.isConnected && employeeId) {
      setRoomJoined(false);
      socket.emit(SOCKET_ROUTES.JOIN_ROOM, {
        to: mobile,
        userId: `${employeeId}`,
      });
      setDataInSessionStorage(SOCKET_CONSTANTS.PHONE, mobile);
      socket.on(SOCKET_ROUTES.ROOM_STATUS, (data) => {
        console.log(data);

        setRoomJoined(true);
      });
      resetUnreadCount(mobile);
    }
  }, [mobile, props.isConnected, employeeId]);

  return (
    <div className={styles.messageScreen} ref={chatScreenRef}>
      <Fragment>
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
          candidateName={name}
          onTemplateSend={handleTemplateSend}
          chatScreenRef={chatScreenRef}
          isLoading={!props.isConnected || !isRoomJoined}
        />
      </Fragment>
    </div>
  );
};
export default MessageScreen;
