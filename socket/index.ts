import io from "socket.io-client";
const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
  extraHeaders: {
    "ngrok-skip-browser-warning": "skip-browser-warning",
    "Content-type": "application/json",
  },
  path: "/wa/socket.io",
  autoConnect: false,
});
export default socket;
