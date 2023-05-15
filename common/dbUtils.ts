import { db } from "@/db";
import { ISentMessage } from "./types";
import { messageSaga } from "@/redux/sagas/message.saga";

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
  messageId: string,
  isPending: boolean
) => {
  const result = await db.conversations.where("id").equals(mobile).first();
  const isMessageExists =
    isPending &&
    (await db.messages.where("messageId").equals(messageId).first());

  if (result !== undefined && mobile && !isMessageExists) {
    await db?.conversations.put({
      ...result,
      unreadCount: result.unreadCount + 1,
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

export const filterList = async (searchKey: string) => {
  if (searchKey) {
    db.conversations
      .filter(function (data) {
        return data.id.includes(searchKey);
      })
      .toArray()
      .then(function (result) {});
  }
};

export const getMessageFromMessageId = async (messageId: string) => {
  const result = await db.messages.where("messageId").equals(messageId).first();
  return result;
};

export const deleteMessageByMessageId = (whatsappId: string) => {
  db.messages.delete(whatsappId);
};
