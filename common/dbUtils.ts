import { db } from "@/db";
import { ISentMessage } from "./types";
import { messageSaga } from "@/redux/sagas/message.saga";
import { ICandidateListCardProps } from "@/pageComponents/messages/candidateListCard/candidateListCard.types";
import { SOCKET_CONSTANTS } from "./socketConstants";

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

export const getFilteredData = async (
  searchKey: string,
  selectedLevels: string[]
) => {
  const result = await db.conversations
    .filter(function (data: any) {
      if (
        data.id.includes(searchKey) ||
        data.name.toLowerCase().startsWith(searchKey.toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .toArray();
  return result;
};

export const getMessageFromMessageId = async (messageId: string) => {
  const result = await db.messages.where("messageId").equals(messageId).first();
  return result;
};

export const sortMessageByTime = async (phone: string) => {
  const result = await db.messages
    .where(SOCKET_CONSTANTS.PHONE)
    .equals(phone)
    .sortBy("timestamp");
  return result;
};

export const deleteMessageByMessageId = (whatsappId: string) => {
  db.messages.delete(whatsappId);
};

export const addCandidate = async (candidateData: any) => {
  const {
    id,
    firstName,
    lastName,
    techStack,
    postingTitle,
    interviewLevel,
    interviewStatus,
    profilePhoto,
    mobileNumber,
    roomId,
    recruiterFirstName,
    recruiterLastName,
    associatedTa,
  } = candidateData;
  const updatedData = {
    userId: id,
    id: mobileNumber,
    profilePhoto,
    name: `${firstName} ${lastName}`,
    interviewLevel,
    interviewStatus,
    postingTitle,
    techStack,
    roomId,
    recruiterFirstName,
    recruiterLastName,
    ta: associatedTa,
  };
  const result = await db.conversations
    .where("id")
    .equals(mobileNumber)
    .first();
  if (result !== undefined) {
    await db.conversations.put({ ...result, ...updatedData });
  } else {
    await db.conversations.add({
      ...updatedData,
      messages: [],
      unreadCount: 0,
      mobile: mobileNumber,
    });
  }
  return updatedData;
};

export const getCandidateData = async (mobile: any) => {
  const result = await db.conversations.where("id").equals(mobile).first();
  return result;
};

export const getCandidateList = (employeeId: string) => {
  const dbData = db.conversations
    .where("associatedTa")
    .equals(`${employeeId}`)
    .toArray();
  console.log(employeeId);
  return dbData;
};
