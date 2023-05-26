import Dexie, { Table } from "dexie";
import { ISentMessage } from "./common/types";
import { ICandidateListCardProps } from "./pageComponents/messages/candidateListCard/candidateListCard.types";

export interface IMessage extends ICandidateListCardProps {
  id: string;
  messages: ISentMessage[];
  ta: string;
  unreadCount: number;
  roomId: string;
}
export class MySubClassedDexie extends Dexie {
  conversations!: Table<IMessage>;
  messages!: Table<ISentMessage>;

  constructor() {
    super("ccMessages");
    this.version(14).stores({
      conversations:
        "id, ta, messages, unreadCount,profilePhoto, name, userId, status, message, interviewLevel, interviewStatus, postingTitle, techStack, roomId, recruiterFirstName, recruiterLastName",
      messages:
        "messageId,message,timestamp,messageType,status,to,from, phone, mediaUrl, fileName",
    });
  }
}

export const db = new MySubClassedDexie();
