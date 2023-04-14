import Dexie, { Table } from "dexie";
import { ISentMessage } from "./common/types";

// interface IUserMessages {
//   [key: string]: IMessage;
// }
export interface IMessage {
  id: string;
  messages: ISentMessage[];
  ta: string;
}
export class MySubClassedDexie extends Dexie {
  conversations!: Table<IMessage>;

  constructor() {
    super("ccMessages");
    this.version(2).stores({
      conversations: "id, ta, messages",
    });
  }
}

export const db = new MySubClassedDexie();
