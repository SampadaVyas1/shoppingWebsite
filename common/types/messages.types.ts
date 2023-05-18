import { MESSAGE_TYPES } from "@/common/types/enums";
import { ITagType } from "@/components/tag/tag.types";

export interface IMessagesStates {
  selectedCandidate: any;
  selectedLevels: ITagType[];
  isConnected: boolean;
  searchValue: string;
  isFilterOpen: boolean;
  isAddModalOpen: boolean;
}

export interface ISelectedFile {
  file: File;
  type: string;
}

export interface IIncomingMessageType {
  from: string;
  wamid: string;
  messageType: string;
  timestamp: string;
  message: string;
  mediaUrl: string;
  caption: string;
  fileName: string;
}
