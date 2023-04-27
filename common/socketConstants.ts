export const SOCKET_ROUTES = {
  GET_MESSAGE: "get_message",
  PERSONAL_MESSAGE: "personalMessage",
  STATUS: "status",
  NOTIFICATION: "notification",
  JOIN_ROOM: "joinRoom",
  ROOM_STATUS: "roomStatus",
  CONNECT: "connect",
  RECONNECT: "reconnect",
  DISCONNECT: "disconnect",
  CREDENTIALS: "credentials",
  SEND_PERSONAL_MESSAGE: "send_personal_message",
  SEND_MEDIA: "sendMedia",
  GET_MEDIA: "getMedia",
  PENDING_MESSAGES: "pendingMessages",
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
