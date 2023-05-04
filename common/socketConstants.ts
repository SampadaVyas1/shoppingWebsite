export const SOCKET_ROUTES = {
  GET_MESSAGE: "getMessage",
  PERSONAL_MESSAGE: "personalMessage",
  STATUS: "status",
  NOTIFICATION: "notification",
  JOIN_ROOM: "joinRoom",
  ROOM_STATUS: "roomStatus",
  CONNECT: "connect",
  RECONNECT: "reconnect",
  DISCONNECT: "disconnect",
  CREDENTIALS: "credentials",
  SEND_PERSONAL_MESSAGE: "sendPersonalMessage",
  SEND_MEDIA: "sendMedia",
  GET_MEDIA: "getMedia",
  PENDING_MESSAGES: "pendingMessages",
  PENDING_STATUS: "pendingStatus",
};

export enum MESSAGE_STATUS_VARIANT {
  SENT = "sent",
  RECEIVED = "received",
}

export enum SOCKET_CONSTANTS {
  PHONE_ID = "106886972321301",
  USER_ID = "11098",
  MESSAGING_PRODUCT = "whatsapp",
  RECIPEINT_TYPE = "individual",
}
