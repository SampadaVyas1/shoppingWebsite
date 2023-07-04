"use strict";

import { REFRESH_KEY } from "@/common/constants";

export const initiateSocket = ()=>{
  const employeeId=window.atob(`${localStorage.getItem(REFRESH_KEY)}`)
  const url = `wss://tv3cidqrkf.execute-api.ap-south-1.amazonaws.com/dev?employeeId=${employeeId}`;
  const socketConnection = new WebSocket(url);
  socketConnection.onopen = () => {
    console.log("WebSocket connection established.");
  };
  socketConnection.onclose = (event) => {
    if (event.code === 1001) {
      initiateSocket();
    }
  };
  return socketConnection;
}
