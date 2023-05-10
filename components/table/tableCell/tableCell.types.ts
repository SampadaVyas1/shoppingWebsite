import { IRecruitersList } from "@/common/types";
import {
  IAdditionalValue,
  IData,
  IShowToggle,
} from "@/pages/candidates/candidates.types";

export interface ITable {
  dataIndex: string;
  data: IData[];
  field?: { time: string };
  additionalValue?: IAdditionalValue[];
  showToggle?: IShowToggle;
  dataFormatType?: string;
  index: number;
  hoverCell?: string;
  onSwitchToggle?: (data: any) => void;
}

export interface IExtraField {
  colspan: string;
  colspanValue: string;
  customStyle?: string;
}
