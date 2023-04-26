import { db } from "@/db";
import { ISentMessage } from "./types";

export const resetUnreadCount = async (mobile: string) => {
  const result = await db.conversations.where("id").equals(mobile).first();
  if (result !== undefined) {
    try {
      await db?.conversations.put({
        ...result,
        unreadCount: 0,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const insertMessage = async (message: ISentMessage) => {
  await db.messages.put(message);
};

export const updateMessage = async (newMessage: ISentMessage) => {
  await db.messages.put(newMessage);
};

export const sortMessages = (messageList: ISentMessage[]) => {
  return messageList?.sort(
    (firstMessage: ISentMessage, secondMessage: ISentMessage) =>
      parseInt(firstMessage.timestamp) - parseInt(secondMessage.timestamp)
  );
};

export const getMessages = async (mobile: string) => {
  return await db.messages.where("phone").equals(mobile).toArray();
};

export const increaseUnreadCount = async (
  mobile: string,
  currentRoomNumber: string
) => {
  const result = await db.conversations.where("id").equals(mobile).first();
  if (result !== undefined) {
    await db?.conversations.put({
      ...result,
      unreadCount:
        currentRoomNumber === mobile
          ? result.unreadCount
          : result.unreadCount + 1,
    });
  }
};

export const getSentMessageData = (messageData: ISentMessage) => {
  const {
    messageId,
    message,
    timestamp,
    to,
    from,
    mediaUrl,
    status,
    messageType = "text",
    caption,
  } = messageData;
  const newMessage = {
    messageId: messageId,
    message: message,
    timestamp: `${timestamp}`,
    messageType: messageType,
    mediaUrl: mediaUrl,
    status: status,
    to: to,
    caption: caption,
    from: from,
  };
  return newMessage;
};
