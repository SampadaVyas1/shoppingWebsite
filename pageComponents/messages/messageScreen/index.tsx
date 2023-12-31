import {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  Fragment,
  useCallback,
} from "react";
import { v4 as uuid } from "uuid";
import { db } from "@/db";
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
} from "@/common/utils";
import {
  SOCKET_CONSTANTS,
  SOCKET_ROUTES,
} from "@/common/constants/socketConstants";
import {
  deleteMessageByMessageId,
  getMessageFromMessageId,
  getSentMessageData,
  updateMessage,
} from "@/common/utils/dbUtils";
import { MESSAGE_STATUS, MESSAGE_TYPES, ROLES } from "@/common/types/enums";
import { ISelectedFile } from "@/common/types/messages.types";
import { useAppSelector } from "@/redux/hooks";
import { initiateSocket } from "@/socket/webSocket";
import { sendMediaData, uploadPresinedUrl } from "@/services/messages.service";

const MessageScreen = (props: IMessageScreenProps) => {
  const { name, designation, techStack, interviewLevel, profileImage, id, ta } =
    props.candidateData;

  const [message, setMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<ISelectedFile | null>(null);
  const chatScreenRef = useRef<HTMLDivElement>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [socketConnection, setSocketConnetion] = useState<any>();

  console.log(socketConnection)
  const { employeeId, role } = useAppSelector(
    (state) => state.login.userDetails
  );

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

  const handleClick = async (
    message: any,
    whatsappId: string = "",
    file?: any,
    fileName?: string,
    contentType?: string,
    messageType?: any,
    mediaUrl?: any
  ) => {
    const timestamp = getTimeStamp().toString();
    const messageId = `${uuid()}${timestamp}`;
    const commonParams = {
      to: id,
      from: `${employeeId}`,
      timestamp,
      messageId,
    };
    const response: any =
      !!selectedFile?.file &&
      (await sendMediaData({
        fileName: selectedFile?.file?.name,
        fileType: selectedFile?.file?.type,
        employeeId: `${employeeId}`,
        to: id,
      }));
    setLoader(true);

    const presignedUrl = !!response?.data?.data && response?.data?.data;
    const isUploaded =
      !!presignedUrl && (await uploadPresinedUrl(presignedUrl, selectedFile));

    const sendMedia = !!(selectedFile || file) && {
      action: SOCKET_ROUTES.SEND_MEDIA_MESSAGE,
      body: {
        phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
        employeeId: `${employeeId}`,
        to: id,
        imageData: {
          fileName: selectedFile?.file?.name
            ? selectedFile?.file?.name
            : file?.file?.name
            ? file?.file?.name
            : fileName,
          caption: message,
          messageId: messageId,
          type: selectedFile?.type
            ? selectedFile?.type
            : file?.type
            ? file?.type
            : messageType,
          contentType: selectedFile?.file.type
            ? selectedFile?.file.type
            : file?.file?.type
            ? file?.file?.type
            : contentType,
        },
      },
    };
    const data = !!message && {
      action: SOCKET_ROUTES.SEND_MESSAGE,
      body: {
        phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
        employeeId: `${employeeId}`,
        to: id,
        type: MESSAGE_TYPES.TEXT,
        recipient_type: SOCKET_CONSTANTS.RECIPIENT_TYPE,
        text: {
          body: message,
        },
        messageId: messageId,
      },
    };
    const newMessage =
      !(selectedFile?.file?.name || file?.file?.name || fileName) &&
      !!!selectedFile
        ? getSentMessageData({
            ...commonParams,
            message,
            messageType: MESSAGE_TYPES.TEXT,
            status: MESSAGE_STATUS.SENT,
          })
        : getSentMessageData({
            ...commonParams,
            mediaUrl: selectedFile?.file
              ? selectedFile?.file
              : file?.file
              ? file?.file
              : mediaUrl,
            caption: message,
            file: selectedFile ? selectedFile : file,
            fileName: selectedFile?.file.name
              ? selectedFile?.file.name
              : file?.file?.name
              ? file?.file?.name
              : fileName,
            messageType: selectedFile?.type
              ? selectedFile!.type
              : file?.type
              ? file?.type
              : messageType,
            contentType: selectedFile?.file.type
              ? selectedFile?.file.type
              : file?.file?.type
              ? file?.file?.type
              : contentType,
            status: MESSAGE_STATUS.SENDING,
          });
    setMessage("");
    selectedFile?.file?.name && setSelectedFile(null);
    whatsappId.length && deleteMessageByMessageId(whatsappId);
    await updateMessage({ ...newMessage, phone: id });
    const doesFileExist =
      selectedFile?.file?.name || file?.file?.name || fileName;
    !doesFileExist && !!socketConnection
      ? socketConnection.send(JSON.stringify(data))
      : socketConnection.send(JSON.stringify(sendMedia));
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
    const data = {
      action: SOCKET_ROUTES.SEND_TEMPLATE,
      body: {
        phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
        employeeId: `${employeeId}`,
        to: id,
        type: MESSAGE_TYPES.TEMPLATE,
        template: {
          namespace: templateData.messageId,
          name: templateData.name,
          language: {
            policy: "deterministic",
            code: "en",
          },
          components: [
            {
              type: MESSAGE_TYPES.HEADER,
              parameters: [
                {
                  type: MESSAGE_TYPES.TEXT,
                  text: templateData.components[0]?.parameters[0]?.text,
                },
              ],
            },
          ],
          messageId: messageId,
        },
      },
    };
    socketConnection.send(JSON.stringify(data));
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
      to: id,
      from: `${employeeId}`,
    });
    await updateMessage({ ...newMessage, phone: id });
  };

  const getStatus = (event: any) => {
    const data = JSON.parse(event.data);

    getMessageFromMessageId(data.id).then((response) => {
      !!response &&
        !!data.status &&
        updateMessage({ ...response, status: data.status });
    });
  };

  const getUpdateMessageId = async (event: any) => {
    const messageData = JSON.parse(event.data);
    console.log(messageData);
    setLoader(false);
    const messageId = (messageData.messageId && messageData.messageId) || "";
    const mediaUrl = messageData.mediaUrl && messageData.mediaUrl;
    const id = !!messageId && messageData.id;
    const url = !!mediaUrl && messageData.mediaUrl;

    getMessageFromMessageId(messageId).then((data) => {
      db.messages
        .update(messageId, {
          ...data,
          messageId: id,
          mediaUrl: url,
          messageType: messageData.type,
        })
        .then(() => {
          getStatus(event);
        });
    });

    !!messageData.message && receiveMessage(messageData);
    if (!!messageData.mediaUrl &&messageData.type === MESSAGE_TYPES.USER_INITIATED){
      receiveMessage(messageData);
    }
  };

  const receiveMessage = (data: any) => {
    const { from, wamid, messageType, timestamp, message, mediaUrl, caption } =
      data;

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
    updateMessage({ ...newMessage, phone: from });
  };

  useEffect(() => {
    const connection = initiateSocket();
    console.log(connection)
    setSocketConnetion(connection);
  }, []);

  useEffect(() => {
    socketConnection &&
      (socketConnection.onmessage = (event: any) => {
        console.log(event.data);
        getUpdateMessageId(event);
      });
  }, [socketConnection]);

  return (
    <div className={styles.messageScreen} ref={chatScreenRef}>
      <Fragment>
        <ChatHeader
          name={name}
          phone={id}
          recruiter={props.recruiterName}
          designation={designation}
          techStack={techStack}
          interviewStatus={interviewLevel}
          profileImage={profileImage}
          isLoading={!socketConnection}
        />
        {!socketConnection ? (
          <ChatBodySkeleton />
        ) : (
          <ChatBody
            phone={id}
            onRetry={handleClick}
            isLoading={!socketConnection}
          />
        )}
        <ChatBottom
          onSend={handleClick}
          phone={id}
          loader={loader}
          onFileSelection={handleFileSelect}
          selectedFile={selectedFile}
          handleMessageChange={handleMessageChange}
          message={message}
          onFileRemoval={handleFileRemoval}
          candidateName={name}
          onTemplateSend={handleTemplateSend}
          chatScreenRef={chatScreenRef}
          isLoading={!socketConnection}
        />
      </Fragment>
    </div>
  );
};
export default MessageScreen;
