import io from "socket.io-client";
const socket = io("http://192.168.2.144:3002", {
  extraHeaders: {
    Authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN!,
    userId: "1",
    mobileNumber: `917972287471`,
    userName: "Rahul",
  },
});
export default socket;
