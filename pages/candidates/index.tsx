import Button from "@/components/button";
import InputBox from "@/components/inputBox";
import socket from "@/socket";
import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
const Candidates = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastData, setLastData] = useState<any>(null);

  const [messages, setMessages] = useState<any>([]);
  const messageList = useLiveQuery(() => db?.messages?.toArray());

  console.log(messageList);

  const createSession = () => {
    if (socket.connected) {
      socket.on("session", (data: any) => {
        setLastData(data);
      });
    }
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket.on) {
      socket.on("session", (data: any) => {
        setIsConnected(true);
        setLastData(data);
        socket.emit("join", `${data.mobile}${data.userId}`);
      });
    }
  }, []);

  const addMessage = async (data: any) => {
    try {
      await db.messages.add(data);
    } catch (error) {
      await db.messages.put(data);
    }
  };

  const updateMessage = async (message: any) => {
    await db.messages.bulkPut(message);
  };

  useEffect(() => {
    socket.on("status", async (data: any) => {
      const messageCopy = [...messages];
      const updatedMessage = messageCopy.map((message: any) => {
        if (message.messageId.toString() === data.id.toString()) {
          return { ...message, status: data.status };
        }
        return message;
      });
      setMessages([...updatedMessage]);
      await updateMessage(updatedMessage);
    });
  }, [messages]);

  useEffect(() => {
    const receiveMessage = (data: any) => {
      const { from, wamid, messageType, timestamp, message } = data;
      console.log(from);
      const newMessage = {
        messageId: wamid,
        message: message,
        timestamp: timestamp,
        messageType: messageType,
        to: lastData?.userId, //TA's employee id
        from: "918825147844", //user's phone number
      };
      setMessages([...messages, newMessage]);
      addMessage(newMessage);
    };
    if (socket.on) {
      socket.on("personalMessage", receiveMessage);
    }
    return () => {
      socket.off("personalMessage", receiveMessage);
    };
  }, [lastData?.userId, messages]);

  const handleClick = () => {
    socket.emit("send_personal_message", {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "918825147844", //To whom you want to send message
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
        to: "918825147844", //user's phone number
        from: lastData?.userId, //TA's employee id
      };
      setMessages([...messages, newMessage]);
      await addMessage(newMessage);
    });
  };

  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (value: any) => {
    setMessage(value);
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>User Id: {lastData?.userId || "-"}</p>
      <InputBox
        value={message}
        handleChange={handleMessageChange}
        label="message"
        customClass={styles.message}
      />
      <Button onClick={handleClick}>Send</Button>
    </div>
  );
};
export default Candidates;
