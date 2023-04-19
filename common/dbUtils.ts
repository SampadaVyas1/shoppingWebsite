import { db } from "@/db";
import { ISentMessage } from "./types";

export const addMessage = async (data: ISentMessage, mobile: string) => {
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
        await db?.conversations.put({ ...result, messages: uniqueMessages });
      } catch (error) {
        console.log(error);
      }
    } else {
      const messageData = {
        id: mobile,
        ta: "11098",
        messages: [data],
      };
      try {
        await db.conversations?.put(messageData);
      } catch (error) {
        console.log("error");
      }
    }
  }
};
