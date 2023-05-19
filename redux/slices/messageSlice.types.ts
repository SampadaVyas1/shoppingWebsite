import { ISentMessage } from "@/common/types";

export interface IMessageSliceStates {
  isLoading: boolean;
  phone: string;
  templates: any;
  syncing: boolean;
  isError: boolean;
  currentMessage: ISentMessage;
}
