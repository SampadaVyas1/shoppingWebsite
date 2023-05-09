import Dexie, { Table } from "dexie";
import { ISentMessage } from "./common/types";

export interface IMessage {
  id: string;
  messages: ISentMessage[];
  ta: string;
  unreadCount: number;
}
export class MySubClassedDexie extends Dexie {
  conversations!: Table<IMessage>;
  messages!: Table<ISentMessage>;

  constructor() {
    super("ccMessages");
    this.version(8).stores({
      conversations: "id, ta, messages, unreadCount",
      messages:
        "messageId,message,timestamp,messageType,status,to,from, phone, mediaUrl",
    });
  }
}

export const db = new MySubClassedDexie();
