import Button from "@/components/button";
import socket from "@/socket";
import { useEffect, useState } from "react";
const Candidates = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastData, setLastData] = useState<any>(null);

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
      socket.on("connection", () => {
        try {
          console.log(`Connected : ${socket.id}`);
        } catch (error) {
          console.log(error);
        }
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsConnected(socket.connected);
  }, []);

  useEffect(() => {
    createSession();
    return () => {
      socket.off("session", () => {
        console.log("closed");
      });
    };
  }, []);

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last Data: {lastData?.userId || "-"}</p>
      {/* <Button onClick={connectSocket}>Connect socket</Button> */}
    </div>
  );
};
export default Candidates;
