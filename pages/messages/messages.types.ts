import { ITagType } from "@/components/tag/tag.types";
import { ICandidateListCardProps } from "./candidateListCard/candidateListCard.types";

export interface IMessagesStates {
  selectedCandidate: any;
  selectedLevels: ITagType[];
  isConnected: boolean;
  searchValue: string;
}

export interface ISelectedFile {
  file: File;
  type: string;
}
