import { ISentMessage } from "@/common/types";

export interface IChatBodyProps {
  isLoading: boolean;
  phone: string;
  onRetry: (message: string, messageId: string) => void;
}

export interface IChatListProps {
  chats: ISentMessage[];
  onRetry: (message: string, messageId: string, file:string | File, fileName:string,contentType:string,messageType:string,mediaUrl:any) => void;
  handleMediaDownload: (media: string) => void;
  setSelectedImage: (media: string | File) => void;
}
