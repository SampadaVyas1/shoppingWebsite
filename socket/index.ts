import { getDataFromLocalStorage } from "@/common/utils";
import io from "socket.io-client";
const socket = io("https://7f75-103-176-135-206.ngrok.io", {
  extraHeaders: {
    to: `${getDataFromLocalStorage("mobile")}`,
    phone_id: "106886972321301",
    "ngrok-skip-browser-warning": "skip-browser-warning",
    "Content-type": "application/json",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6InlhMjkuYTBBZWw5c0NPYUcteDduaUd5QVZZY19GMTlSTnVRV3RPTFJhaWtSd0I5bWt2WTN5ZXVCcmZiUDRWWTdwX1RERXJEeDVlRkxraUNtek9NV0Nta2pPcVhNOHBVSGxxak5YRDVUV1JHQ0ItbC1sYmdrc29FMWd6Y09UbFYzTnBLZWRqSnJ4R1JPdXI0S2Z6d3REY3VtbEFPRFN3TjRWUFNhQ2dZS0FVVVNBUkVTRlFGNHVkSmgxNU5KVldPaU9zYjFqeEFMWHhRZ2d3MDE2MyIsImVtcGxveWVlSWQiOjExMDk4LCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODA1ODU1MjEsImV4cCI6MTY4MTE5MDMyMX0.6PojB611bXxJjWbP-umN56FfmS00ll-m_Usll6fWMCk",
  },
  reconnection: false,
  autoConnect: false,
});
export default socket;
