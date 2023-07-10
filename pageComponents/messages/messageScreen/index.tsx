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
  getDataFromLocalStorage,
  getTimeStamp,
  setDataInSessionStorage,
} from "@/common/utils";
import {
  SOCKET_CONSTANTS,
  SOCKET_ROUTES,
} from "@/common/constants/socketConstants";
import {
  deleteMessageByMessageId,
  getMessageFromMessageId,
  getSentMessageData,
  resetUnreadCount,
  updateMessage,
} from "@/common/utils/dbUtils";
import { MESSAGE_STATUS, MESSAGE_TYPES, ROLES } from "@/common/types/enums";
import { ISelectedFile } from "@/common/types/messages.types";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setPhone } from "@/redux/slices/messageSlice";
import { initiateSocket } from "@/socket/webSocket";
import axios from "axios";
import { sendMediaData } from "@/services/messages.service";
import service from "@/services/config";

const MessageScreen = (props: IMessageScreenProps) => {

  const { name, designation, techStack, interviewLevel, profileImage, id, ta } =
    props.candidateData;

  const [isRoomJoined, setRoomJoined] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<ISelectedFile | null>(null);
  const chatScreenRef = useRef<HTMLDivElement>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [socketConnection,setSocketConnetion]=useState<any>()
  const dispatch = useDispatch();

  const { employeeId, role } = useAppSelector((state) => state.login.userDetails);

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
      !!selectedFile?.file && (await sendMediaData({
        fileName: selectedFile?.file?.name,
        fileType: selectedFile?.file?.type,
        employeeId: `${employeeId}`,
        to: id,
      }));
    setLoader(true);
    console.log(selectedFile?.file)

    const presignedUrl = !!response?.data?.data && response?.data?.data;
    const isUploaded =
      !!presignedUrl &&
      (await axios.put(presignedUrl, selectedFile?.file, {
        headers: {
          "Content-Type": selectedFile?.file?.type,
        },
      }));
    const sendMedia = !!presignedUrl &&
      !!selectedFile && {
        action: SOCKET_ROUTES.SEND_MEDIA_MESSAGE,
        body: {
          phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
          employeeId: `${employeeId}`,
          to: id,
          imageData: {
            fileName: selectedFile?.file?.name,
            caption: message,
            messageId: messageId,
            type: selectedFile?.type,
            contentType: selectedFile?.file.type,
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
      !selectedFile?.file?.name && !!!selectedFile
        ? getSentMessageData({
            ...commonParams,
            message,
            messageType: MESSAGE_TYPES.TEXT,
            status: MESSAGE_STATUS.SENT,
          })
        : getSentMessageData({
            ...commonParams,
            mediaUrl: selectedFile?.file,
            caption: message,
            messageType: selectedFile.type,
            status: MESSAGE_STATUS.SENDING,
          });
    setMessage("");
console.log(sendMedia)
    selectedFile?.file?.name && setSelectedFile(null);
    whatsappId.length && deleteMessageByMessageId(whatsappId);
    await updateMessage({ ...newMessage, phone: id });
    !selectedFile?.file?.name && !!socketConnection
      ? socketConnection.send(JSON.stringify(data)):
       socketConnection.send(JSON.stringify(sendMedia));
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

  const getStatus = async (event: any) => {
    const data = JSON.parse(event.data);
    const matchedResult = !!data.id && (await getMessageFromMessageId(data.id));
    if (matchedResult) {
      !!data.status && await updateMessage({ ...matchedResult, status: data.status });
    }
  };
  const getUpdateMessageId = async (event: any) => {
    const messageData = JSON.parse(event.data);
    console.log("messageData",messageData);
    setLoader(false);
    const messageId = messageData.messageId && messageData.messageId;
    const mediaUrl = messageData.mediaUrl && messageData.mediaUrl;
    const id = !!messageId && messageData.id;
    const url = !!mediaUrl && messageData.mediaUrl;
    const matchedResult =
      messageId && (await getMessageFromMessageId(messageId));
    if (matchedResult) {
      await db.messages.update(messageId, {
        ...matchedResult,
        messageId: id,
        mediaUrl: url,
        messageType: messageData.type,
      });
    }
    !!messageData.message && receiveMessage(messageData);
    if (
      !!messageData.mediaUrl &&
      messageData.type === MESSAGE_TYPES.USER_INITIATED
    ) {
      receiveMessage(messageData);
    }
  };
  const receiveMessage = async (data: any) => {
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
    await updateMessage({ ...newMessage, phone: from });
  };

  // const getMediaFromSocket = () => {
  //   socket.on(SOCKET_ROUTES.GET_MEDIA, async (data: any) => {
  //     const { id, receiverNumber, messageId, mediaUrl, fileName } = data;
  //     const result = await getMessageFromMessageId(messageId);
  //     if (result) {
  //       await db.messages.update(messageId, {
  //         ...result,
  //         message: result?.message,
  //         messageId: id,
  //         mediaUrl: mediaUrl,
  //         fileName: fileName,
  //         status: MESSAGE_STATUS.SENT,
  //       });
  //     }
  //   });
  // };

  // const getMessageFromSocket = () => {
  //   socket.on(SOCKET_ROUTES.GET_MESSAGE, async (data: any) => {
  //     const { id, receiverNumber, messageId } = data;
  //     const result = await getMessageFromMessageId(messageId);

  //     if (result) {
  //       await db.messages.update(messageId, {
  //         ...result,
  //         message: result?.message,
  //         messageId: id,
  //       });
  //     }
  //   });
  // };
  useEffect(() => {
    const connection = initiateSocket();
    setSocketConnetion(connection)
  }, []);
  console.log(">>socketConnection",socketConnection)
  useEffect(() => {
    // getMessageFromSocket();
    socketConnection && (socketConnection.onmessage = (event: any) => {
      getUpdateMessageId(event);
      getStatus(event);
    });
    // if(!!socketConnection)
    // {
    //   socketConnection.onmessage = (event: any) => {
    //     getUpdateMessageId(event);
    //     getStatus(event);
    //   };
    // }
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
        {
          !socketConnection ? (
            <ChatBodySkeleton />
          ) :
          <ChatBody
            phone={id}
            onRetry={handleClick}
            isLoading={!socketConnection}
          />
        }
        <ChatBottom
          onSend={handleClick}
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
