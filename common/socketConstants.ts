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
  SEND_TEMPLATE: "sendTemplate",
};

export enum MESSAGE_STATUS_VARIANT {
  SENT = "sent",
  RECEIVED = "received",
}

export enum SOCKET_CONSTANTS {
  PHONE_ID = "104746919070579",
  USER_ID = "11098",
  MESSAGING_PRODUCT = "whatsapp",
  RECIPIENT_TYPE = "individual",
}
