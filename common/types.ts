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
  status?: MESSAGE_STATUS;
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
