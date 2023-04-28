import { ICandidateListCardProps } from "../candidateListCard/candidateListCard.types";

export interface ICandidateListProps {
  isLoading: boolean;
  candidateData: ICandidateListCardProps[];
  selectedData: ICandidateListCardProps;
  onSelect: (candidate: ICandidateListCardProps) => void;
}
