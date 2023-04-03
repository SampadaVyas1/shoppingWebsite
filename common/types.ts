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
  status: string;
}
