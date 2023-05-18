import { ISentMessage } from "@/common/types";

export interface IMessageSliceStates {
  isLoading: boolean;
  phone: string;
  templates: any;
  isError: boolean;
  currentMessage: ISentMessage;
}
