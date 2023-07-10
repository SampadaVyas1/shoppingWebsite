"use strict";

import { EMPLOYEEID} from "@/common/constants";
import { getDataFromLocalStorage } from "@/common/utils";

export const initiateSocket = ()=>{
  const employeeId=getDataFromLocalStorage(EMPLOYEEID)
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
