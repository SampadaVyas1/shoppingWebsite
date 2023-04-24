import { IAdditionalValue } from "@/pages/candidates/candidates.types";

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
}

export interface IRecordProps {
  id: number;
  name: string;
  designation: string;
  mobileNumber: string;
  experienceLevel: string;
  createdTime: string;
  status: string;
  recruiter: string;
  techStack: string;
  time: string;
  checked: boolean;
}

export interface ITableComponent {
  additionalValue: IAdditionalValue[];
  data: any;
  columnHeaderTitle: {
    id: number;
    title: string;
    sort?: boolean | false;
  }[];
  sortbuttonData: {
    [key: string]: { upKeyDisabled: boolean; downKeyDisabled: boolean };
  };
  dataFormatType: string;
  fieldforDateFormat: { time: string };
  customStyle?: {
    header: {
      row: (props: any[]) => JSX.Element;
    };
  };
}
