import { ICandidateListCardProps } from "@/pageComponents/messages/candidateListCard/candidateListCard.types";

export interface IButtonState {
  [key: string]: { upKeyDisabled: boolean; downKeyDisabled: boolean };
}

export interface IData {
  [key: string]: any;
}

export interface IHeaderTitleProps {
  id: number;
  title: string;
  sort?: boolean | false;
  key: string;
  dataIndex: string;
}

export interface IAdditionalValue {
  colspan: string;
  colspanValue: string;
  customStyle?: string;
}

export interface IFilter {
  type: string;
  name: string;
  value: { id: number; label: string }[];
}
export interface IList {
  id: number;
  label: string;
}
export interface ICurrentAppliedField {
  interviewLevel?: string[];
  techStack?: string[];
  search?: string;
}

export interface IFilteredData {
  postingTitle?: string[];
  candidateStatus?: string[];
  techStack?: string[];
  interviewLevel?: string[];
}

export interface ISubmitButton {
  experience: {};
  experienceLevel: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  techStack: IList;
}

export interface ICandidatePageProps {
  customScrollStyle: string;
  hasOutsideData: boolean;
  onSelect: (data: IData[]) => void;
}
export interface IShowToggle {
  colspan: string;
  customStyle?: string;
}
