import { IData } from "@/pages/candidates/candidates.types";

export interface IStartConversationModalProps {
  handleClose: () => void;
  candidateList?: any[];
  onCandidateSelect?: (selectedData: IData[]) => void;
}
