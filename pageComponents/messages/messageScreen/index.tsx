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
import { getSendMediaChuks,getSendMediaData } from "@/services/messages.service";
import { TOKEN } from "@/common/constants";

const MessageScreen = (props: IMessageScreenProps) => {
  const socketConnection = initiateSocket();

  const { name, designation, techStack, interviewLevel, profileImage, id, ta } =
    props.candidateData;

  const [isRoomJoined, setRoomJoined] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<ISelectedFile | null>(null);
  const chatScreenRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

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

  const getMediaObject = (selectedFile: any, messageId: any, message: any) => {
    const CHUNK_SIZE = 4096; // Adjust the chunk size as needed

    const sendMedia = !!selectedFile && {
      action: "sendMediaMessage",
      body: {
        phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
        employeeId: `${employeeId}`,
        to: id,
        imageData: {
          file: null, // Will be replaced with chunks of file contents
          fileName: selectedFile?.file?.name,
          caption: message,
          messageId: messageId,
          type: selectedFile.type,
          contentType: selectedFile.file.type,
        },
      },
    };

    const fileReader = new FileReader();
    let offset = 0;

    fileReader.onload = function (event: any) {
      const fileContents = event.target.result;
      const chunk = fileContents.slice(offset, offset + CHUNK_SIZE);
      offset += CHUNK_SIZE;

      if (chunk.length > 0) {
        sendMedia.body.imageData.file = chunk;
        socketConnection.send(JSON.stringify(sendMedia));
        setTimeout(readNextChunk, 0);
      }
    };

    function readNextChunk() {
      const file = selectedFile?.file;
      if (file) {
        const blob = file.slice(offset);
        fileReader.readAsBinaryString(blob);
      }
    }

    readNextChunk();

    return sendMedia;
  };

  const handleClick = async (message: any, whatsappId: string = "") => {
    const timestamp = getTimeStamp().toString();
    const messageId = `${uuid()}${timestamp}`;
    const commonParams = {
      to: id,
      from: `${employeeId}`,
      timestamp,
      messageId,
    };

    const fileReader = new FileReader();
    fileReader.onload = async (event: any) => {
      const fileContents = event.target.result;
      const chunkSize = 20 * 1024;
      const totalChunks = Math.ceil(fileContents.length / chunkSize);
      let fileStatus = true;
      let currentChunk = 0;
      let chunk;

      while (currentChunk < totalChunks) {
        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, fileContents.length);
        chunk = fileContents.slice(start, end);

        const sendMedia = selectedFile && {
          chunk,
          fileName: selectedFile.file.name,
          fileStatus,
        };
        const token=getDataFromLocalStorage(TOKEN)
        await axios.post(
          "https://h6e3fag3ta.execute-api.ap-south-1.amazonaws.com/dev/wa/whatsapp/uploadMedia",
          { ...sendMedia },
          {
            headers: {
              Authorization:
              token,
            },
          }
        );
        currentChunk++;
      }

      console.log("All chunks sent", chunk);
      const token=getDataFromLocalStorage(TOKEN)
      const response = await axios.post(
        "https://h6e3fag3ta.execute-api.ap-south-1.amazonaws.com/dev/wa/whatsapp/uploadMedia",
        { fileStatus: false, fileName: selectedFile?.file.name },
        {
          headers: {
            Authorization:token,
          }
        }
      );

      if (response?.data?.data?.link) {
        const sendMedia = !!selectedFile && {
          action: "sendMediaMessage",
          body: {
            phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
            employeeId: `${employeeId}`,
            to: id,
            imageData: {
              file: response.data.data.link,
              fileName: selectedFile?.file?.name,
              caption: message,
              messageId:messageId,
              type: selectedFile.type,
              contentType: selectedFile.file.type,
            },
          },
        };
        // console.log(sendMedia)
        // !selectedFile?.file?.name
        //   ? socketConnection.send(JSON.stringify(data))
        //   : socketConnection.send(JSON.stringify(sendMedia));
        !!sendMedia &&  socketConnection.send(JSON.stringify(sendMedia));
      }
    };
    selectedFile?.file && fileReader.readAsBinaryString(selectedFile.file);

    socketConnection.onmessage = (event: any) => {
    };
    const data = !!message && {
      action: SOCKET_ROUTES.SEND_MESSAGE,
      body: {
        phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
        employeeId: `${employeeId}`,
        to: id,
        type: MESSAGE_TYPES.TEXT,
        recipient_type:SOCKET_CONSTANTS.RECIPIENT_TYPE,
        text: {
          body: message,
        },
        messageId: messageId,
      },
    };

  
    const sendMedia =
      !!selectedFile?.file && getMediaObject(selectedFile, messageId, message);

    const newMessage = !selectedFile?.file?.name
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

    selectedFile?.file?.name && setSelectedFile(null);
    whatsappId.length && deleteMessageByMessageId(whatsappId);
    await updateMessage({ ...newMessage, phone: id });

    !selectedFile?.file?.name && !!socketConnection
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
              type:MESSAGE_TYPES.HEADER,
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
      !!data.status &&
        (await updateMessage({ ...matchedResult, status: data.status }));
    }
  };
  const getUpdateMessageId = async (event: any) => {
    const messageData = JSON.parse(event.data);
    const messageId = messageData.messageId && messageData.messageId;
    const id = !!messageId && messageData.id;
    const matchedResult =
      messageId && (await getMessageFromMessageId(messageId));
    if (matchedResult) {
      await db.messages.update(messageId, {
        ...matchedResult,
        messageId: id,
      });
    }
    // !!messageData.message || !!messageData.mediaUrl && receiveMessage(messageData);
    // !!messageData.message && receiveMessage(messageData);
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

  const getMediaFromSocket = () => {
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
  };

  const joinRoom = () => {
    setRoomJoined(false);
    setMessage("");
    setSelectedFile(null);
    if (role === ROLES.ADMIN) {
      socket.emit(SOCKET_ROUTES.CREDENTIALS, {
        phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
        userId: `${ta}`,
      });
    }
    socket.emit(SOCKET_ROUTES.JOIN_ROOM, {
      to: id,
      userId: `${employeeId}`,
    });

    dispatch(setPhone(id));
    socket.on(SOCKET_ROUTES.ROOM_STATUS, (data) => {
      setRoomJoined(true);
    });
    resetUnreadCount(id);
  };

  const getMessageFromSocket = () => {
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
  };

  useEffect(() => {
    getMessageFromSocket();
    socketConnection.onmessage = (event: any) => {
      getUpdateMessageId(event);
      getStatus(event);
    };
  }, [socketConnection]);

  useEffect(() => {
    getMediaFromSocket();
  }, [id, props.isConnected]);

  useEffect(() => {
    if (socket.on) {
      socket.on(SOCKET_ROUTES.PERSONAL_MESSAGE, receiveMessage);
    }
    return () => {
      socket.off(SOCKET_ROUTES.PERSONAL_MESSAGE, receiveMessage);
    };
  }, [id, props.userId]);

  useEffect(() => {
    if (socket.connected && employeeId) {
      joinRoom();
    }
  }, [id, socket.connected, employeeId]);

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
          isLoading={!socket.connected || !isRoomJoined}
        />
        {!socket.connected || !isRoomJoined ? (
          <ChatBodySkeleton />
        ) : (
          <ChatBody
            phone={id}
            onRetry={handleClick}
            isLoading={!socket.connected || !isRoomJoined}
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
          isLoading={!socket.connected || !isRoomJoined}
        />
      </Fragment>
    </div>
  );
};
export default MessageScreen;
