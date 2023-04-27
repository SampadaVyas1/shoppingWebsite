import { IAdditionalValue, IData } from "@/pages/candidates/candidates.types";

export interface ITable {
    dataIndex: string;
    data: IData[];
    field?: { time: string };
    additionalValue?: IAdditionalValue[];
    dataFormatType?:string;
    index:number
  }
  
  export interface IExtraField {
    colspan: string;
    colspanValue: string;
    customStyle?: string;
  }
  