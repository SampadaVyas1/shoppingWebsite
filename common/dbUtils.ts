import { db } from "@/db";
import { ISentMessage } from "./types";

export const addMessage = async (
  data: ISentMessage,
  mobile: string,
  isNotification: boolean = false
) => {
  if (data.message.length) {
    const result = await db.conversations.where("id").equals(mobile).first();
    if (result !== undefined) {
      try {
        const prevMessages = [...result.messages, data];
        const uniqueMessages = [
          ...new Map(
            prevMessages.map((item) => [item.messageId, item])
          ).values(),
        ];
        await db?.conversations.put({
          ...result,
          messages: uniqueMessages,
          unreadCount:
            isNotification && prevMessages.length === uniqueMessages.length
              ? result.unreadCount + 1
              : result.unreadCount,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const messageData = {
        id: mobile,
        ta: "11098",
        messages: [data],
        unreadCount: 0,
      };
      try {
        await db.conversations?.put(messageData);
      } catch (error) {
        console.log("error");
      }
    }
  }
};

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
    (x: any, y: any) => parseInt(x.timestamp) - parseInt(y.timestamp)
  );
};

export const getMessages = async (mobile: string) => {
  return await db.messages.where("phone").equals(mobile).toArray();
};

export const increaseUnreadCount = async (mobile: string) => {
  const result = await db.conversations.where("id").equals(mobile).first();
  if (result !== undefined) {
    await db?.conversations.put({
      ...result,
      unreadCount:
        localStorage.getItem("phone") === mobile
          ? result.unreadCount
          : result.unreadCount + 1,
    });
  }
};
