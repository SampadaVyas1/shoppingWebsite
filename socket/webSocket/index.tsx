"use strict";

import { EMPLOYEEID} from "@/common/constants";
import { getDataFromLocalStorage } from "@/common/utils";

export const initiateSocket = ()=>{
  const employeeId=getDataFromLocalStorage(EMPLOYEEID)
  const url = `wss://websocket.dev.connect.coditas.org?employeeId=${employeeId}`;
  const socketConnection = new WebSocket(url);
  socketConnection.onopen = () => {
    console.log("WebSocket connection established.");
  };
  socketConnection.onclose = (event) => {
    if (event.code === 1001) {
      initiateSocket();
      console.log("websocket connection closed")
    }
  };
  return socketConnection;
}
