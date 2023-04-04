import Dexie, { Table } from "dexie";
import { ISentMessage } from "./common/types";

export class MySubClassedDexie extends Dexie {
  messages!: Table<ISentMessage>;

  constructor() {
    super("ccMessages");
    this.version(1).stores({
      users: "phone, messages",
      messages: "messageId, message, timestamp, messageType, status, to, from", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
