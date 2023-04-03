import Button from "@/components/button";
import InputBox from "@/components/inputBox";
import socket from "@/socket";
import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
const Candidates = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastData, setLastData] = useState<any>(null);

  const [messages, setMessages] = useState<any>([]);

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
      // socket.on("connection", () => {
      //   try {
      //     console.log(`Connected : ${socket.id}`);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // });
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

  useEffect(() => {
    socket.on("status", (data: any) => {
      const messageCopy = [...messages];
      const updatedMessage = messageCopy.map((message: any) => {
        if (message.messageId.toString() === data.id.toString()) {
          return { ...message, status: data.status };
        }
        return message;
      });
      setMessages([...updatedMessage]);
    });
  }, [messages]);

  useEffect(() => {
    const receiveMessage = (data: any) => {
      const { from, wamid, messageType, timestamp, message } = data;
      const newMessage = {
        messageId: wamid,
        message: message,
        timestamp: timestamp,
        messageType: messageType,
        to: lastData?.userId, //TA's employee id
        from: from, //user's phone number
      };
      setMessages([...messages, newMessage]);
    };
    if (socket.on) {
      socket.on("personalMessage", receiveMessage);
    }
    return () => {
      socket.off("personalMessage", receiveMessage);
    };
  }, [lastData?.userId, messages]);

  console.log(
    messages.sort(function (first: any, second: any) {
      return parseInt(first.timestamp) - parseInt(second.timestamp);
    })
  );

  const handleClick = () => {
    socket.emit("send_personal_message", {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "917972287471",
      type: "text",
      text: {
        body: message,
      },
    });
    socket.on("get_message", (data: any) => {
      const newMessage = {
        messageId: data.messages[0].id,
        message: message,
        timestamp: data.timestamp,
        messageType: "text",
        status: "sent",
        to: "917972287471", //user's phone number
        from: lastData?.userId, //TA's employee id
      };
      setMessages([...messages, newMessage]);
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
