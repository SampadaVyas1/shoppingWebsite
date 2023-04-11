import io from "socket.io-client";
const socket = io("https://20b7-103-176-135-206.ngrok-free.app", {
  extraHeaders: {
    "ngrok-skip-browser-warning": "skip-browser-warning",
    "Content-type": "application/json",
  },
  reconnection: false,
  autoConnect: false,
});
export default socket;
