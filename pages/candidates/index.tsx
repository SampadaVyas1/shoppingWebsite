import socket from "@/socket";
import { useEffect, useState } from "react";
const Candidates = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastData, setLastData] = useState<any>(null);

  const connectSocket = () => {
    if (socket.on) {
      socket.on("connect", () => {
        setIsConnected(true);
        socket.emit("join", `917972287471`);
      });
      socket.on("connect_failed", function () {
        console.log("failed connection");
      });
      socket.on("error", function () {
        console.log("failed connection");
      });
      socket.on("connecting", function () {
        console.log("failed connection");
      });
      socket.on("coditas", (data: any) => {
        setLastData(data);
        return data;
      });
    }
  };

  useEffect(() => {
    connectSocket();
    // return socket.disconnect();
  }, []);
  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last Data: {lastData?.userId || "-"}</p>
      <button onClick={connectSocket}>Connect socket</button>
    </div>
  );
};
export default Candidates;
