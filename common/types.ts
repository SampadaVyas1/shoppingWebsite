import { MESSAGE_STATUS } from "./enums";

export interface IRouteType {
  id: number;
  path: string;
  name: string;
}

export interface ISentMessage {
  messageId: string;
  message: string;
  timestamp: string;
  messageType: string;
  status?:
    | MESSAGE_STATUS.DELIVERED
    | MESSAGE_STATUS.READ
    | MESSAGE_STATUS.RECEIVED
    | MESSAGE_STATUS.SENT;
  to: string;
  from: string;
  phone?: string;
}
export interface IOptionType {
  id: number;
  label: string;
}
export interface INavbarProps {
  routes: IRouteType[];
}
