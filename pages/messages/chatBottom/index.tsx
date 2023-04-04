import ImageComponent from "@/components/image";
import InputBox from "@/components/inputBox";
import Images from "@/public/assets/icons";
import styles from "./chatBottom.module.scss";
import { useEffect, useState } from "react";
import { db } from "@/db";
import socket from "@/socket";
import messages from "..";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataFromLocalStorage } from "@/common/utils";

const ChatBottom = (props: any) => {
  const [message, setMessage] = useState<string>("");

  const messageList = useLiveQuery(() => db?.messages?.toArray());

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const addMessage = async (data: any) => {
    try {
      await db.messages.add(data);
    } catch (error) {
      await db.messages.put(data);
    }
  };

  const updateMessage = async (message: any) => {
    await db?.messages?.bulkPut(message);
  };

  useEffect(() => {
    socket.on("status", async (data: any) => {
      const updatedMessage = messageList?.map((message: any) => {
        if (message.messageId.toString() === data.id.toString()) {
          return { ...message, status: data.status };
        }
        return message;
      });
      await updateMessage(updatedMessage);
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
        to: props.userId, //TA's employee id
        from: `${getDataFromLocalStorage("mobile")}`, //user's phone number
      };
      addMessage(newMessage);
    };
    if (socket.on) {
      socket.on("personalMessage", receiveMessage);
    }
    return () => {
      socket.off("personalMessage", receiveMessage);
    };
  }, [props?.userId]);

  const handleClick = () => {
    socket.emit("send_personal_message", {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `${getDataFromLocalStorage("mobile")}`, //To whom you want to send message
      type: "text",
      text: {
        body: message,
      },
    });
    socket.on("get_message", async (data: any) => {
      const newMessage = {
        messageId: data.messages[0].id,
        message: message,
        timestamp: data.timestamp,
        messageType: "text",
        status: "sent",
        to: `${getDataFromLocalStorage("mobile")}`, //user's phone number
        from: props?.userId, //TA's employee id
      };
      await addMessage(newMessage);
    });
  };

  return (
    <div className={styles.chatBottom}>
      <ImageComponent src={Images.templateIcon} customClass={styles.icon} />
      <ImageComponent src={Images.attachmentIcon} customClass={styles.icon} />
      <InputBox
        multiline
        placeholder="Enter message"
        customClass={styles.input}
        handleChange={handleMessageChange}
      />
      <ImageComponent
        src={Images.sendIcon}
        customClass={styles.icon}
        onClick={handleClick}
      />
    </div>
  );
};
export default ChatBottom;
