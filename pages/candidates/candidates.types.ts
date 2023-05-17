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
  dataIndex?: string | any;
  key?: string | null;
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
  interviewName?: string[];
  techStack?: string[];
  search?: string;
}

export interface IFilteredData {
  postingTitle?: string[];
  candidateStatus?: string[];
  techStack?: string[];
  interviewName?: string[];
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
