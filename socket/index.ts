import io from "socket.io-client";
const socket = io("https://7767-103-176-135-206.ngrok-free.app/", {
  extraHeaders: {
    "ngrok-skip-browser-warning": "skip-browser-warning",
    "Content-type": "application/json",
  },
  autoConnect: false,
});
export default socket;
