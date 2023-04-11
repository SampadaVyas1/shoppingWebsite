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
import { SKELETON_VARIANT } from "@/common/enums";
import SkeletonLoader from "@/components/skeletonLoader";

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

  const updateMessage = async (updatedMessage: any) => {
    await db?.messages.put(updatedMessage);
  };

  // useEffect(() => {
  //   socket.on("status", async (data: any) => {
  //     console.log(data.id);
  //     const updatedMessage = messageList?.find(
  //       (message: any) => message.messageId.toString() === data.id.toString()
  //     );
  //     if (updatedMessage !== undefined)
  //       await updateMessage({ ...updatedMessage, status: data.status });
  //   });
  // }, [messageList]);

  // useEffect(() => {
  //   const receiveMessage = (data: any) => {
  //     const { from, wamid, messageType, timestamp, message } = data;
  //     const newMessage = {
  //       messageId: wamid,
  //       message: message,
  //       timestamp: timestamp,
  //       messageType: messageType,
  //       to: props.userId, //TA's employee id
  //       from: props.phone, //user's phone number
  //     };
  //     addMessage(newMessage);
  //   };
  //   if (socket.on) {
  //     socket.on("personalMessage", receiveMessage);
  //   }
  //   return () => {
  //     socket.off("personalMessage", receiveMessage);
  //   };
  // }, [props.phone, props.userId]);

  const handleClick = () => {
    console.log(message);
    socket.emit(
      "send_personal_message",
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: props.mobile, //To whom you want to send message
        type: "text",
        text: {
          body: message,
        },
      },
      (error: any) => console.log(error)
    );
  };
  // socket.on("get_message", async (data: any) => {
  //   const newMessage = {
  //     messageId: data.messages[0].id,
  //     message: message,
  //     timestamp: data.timestamp,
  //     messageType: "text",
  //     status: "sent",
  //     to: props.mobile, //user's phone number
  //     from: props?.userId, //TA's employee id
  //   };
  //   await addMessage(newMessage);
  //   setMessage("");
  // });
  return props.isLoading ? (
    <div className={styles.chatBottom}>
      <SkeletonLoader
        type={SKELETON_VARIANT.TEXT_SMALL}
        customClass={styles.skeletonIcon}
      />
      <SkeletonLoader
        type={SKELETON_VARIANT.TEXT_SMALL}
        customClass={styles.skeletonIcon}
      />
      <SkeletonLoader
        type={SKELETON_VARIANT.TEXT_LARGE}
        customClass={styles.skeletonBox}
      />
      <SkeletonLoader
        type={SKELETON_VARIANT.TEXT_SMALL}
        customClass={styles.skeletonIcon}
      />
    </div>
  ) : (
    <form className={styles.chatBottom}>
      <ImageComponent src={Images.templateIcon} customClass={styles.icon} />
      <ImageComponent src={Images.attachmentIcon} customClass={styles.icon} />
      <InputBox
        multiline
        placeholder="Enter message"
        value={message}
        customClass={styles.input}
        handleChange={handleMessageChange}
      />
      <ImageComponent
        src={Images.sendIcon}
        customClass={styles.icon}
        onClick={handleClick}
      />
    </form>
  );
};
export default ChatBottom;
