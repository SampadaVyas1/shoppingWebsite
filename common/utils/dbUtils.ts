import { db } from "@/db";
import { ISentMessage } from "../types";
import { SOCKET_CONSTANTS } from "../constants/socketConstants";
import { getDataFromLocalStorage, getTimeStamp } from ".";
import { getChats, getFileData } from "@/services/messages.service";
import CryptoJS from "crypto-js";
import axios from "axios";
import { TIMESTAMP } from "../constants";

export const resetUnreadCount = async (candidateMobileNumber: string) => {
  const result = await db.conversations
    .where("id")
    .equals(candidateMobileNumber)
    .first();
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

export const getMessages = async (candidateMobileNumber: string) => {
  return await db.messages
    .where("phone")
    .equals(candidateMobileNumber)
    .toArray();
};

export const increaseUnreadCount = async (
  candidateMobileNumber: string,
  messageId: string,
  isPending: boolean
) => {
  const result = await db.conversations
    .where("id")
    .equals(candidateMobileNumber)
    .first();
  const isMessageExists =
    isPending &&
    (await db.messages.where("messageId").equals(messageId).first());

  if (result !== undefined && candidateMobileNumber && !isMessageExists) {
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

export const getMessageFromMessageId = async (messageId: string) => {
  const result = await db.messages.where("messageId").equals(messageId).first();
  return result;
};

export const sortMessageByTime = async (phone: string) => {
  const result = await db.messages
    .where(SOCKET_CONSTANTS.PHONE)
    .equals(phone)
    .sortBy(TIMESTAMP);
  return result;
};

export const deleteMessageByMessageId = (whatsappId: string) => {
  db.messages.delete(whatsappId);
};

export const createDataForSync = async () => {
  const conversations = await db.conversations.toArray();
  const result = await Promise.all(
    conversations.map(async (candidate, index) => {
      const { id, name, interviewStatus, postingTitle, techStack, roomId, ta } =
        candidate;

      const messages = await db.messages
        .where("phone")
        .equals(id)
        .and(function (message) {
          return (
            parseInt(message.timestamp) >
            parseInt(
              `${getDataFromLocalStorage(SOCKET_CONSTANTS.LAST_BACKUP_TIME)}`
            )
          );
        })
        .toArray();
      return {
        id,
        name,
        interviewStatus,
        postingTitle,
        techStack,
        roomId,
        ta,
        messages,
      };
    })
  );
  return { lastBackupTime: getTimeStamp(), chatHistory: result };
};

export const decrypt = (message: string) => {
  const bytes = CryptoJS.AES.decrypt(
    message,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string
  );
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};

export const addDataAfterSync = async () => {
  const response = await getChats();
  const fileData = await getFileData(response.data);
  const chatsData = decrypt(fileData);

  await Promise.all(
    chatsData?.chatHistory?.map(async (user: any) => {
      await db.conversations.put(user);
      await db.messages.bulkPut(user.messages);
    })
  );
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

export const getCandidateData = async (candidateMobileNumber: string) => {
  const result = await db.conversations
    .where("id")
    .equals(candidateMobileNumber)
    .first();
  return result;
};

export const getCandidateList = (employeeId: string) => {
  const dbData = db.conversations
    .where("associatedTa")
    .equals(`${employeeId}`)
    .toArray();

  return dbData;
};

export const getAllMessages = () => {
  return db.messages.toArray();
};

export const getAllConversations = () => {
  return db.conversations.toArray();
};

export const getSortedMessages = (phoneNumber: string) => {
  return db.messages
    .where(SOCKET_CONSTANTS.PHONE)
    .equals(phoneNumber)
    .sortBy(TIMESTAMP);
};
