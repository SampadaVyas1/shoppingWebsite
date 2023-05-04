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
