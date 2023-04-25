import io from "socket.io-client";
const socket = io("https://787c-103-176-135-206.ngrok-free.app", {
  extraHeaders: {
    "ngrok-skip-browser-warning": "skip-browser-warning",
    "Content-type": "application/json",
    // "Content-type": "multipart/form-data",
  },
  autoConnect: false,
});
export default socket;
