export interface ITable {
    dataIndex: string;
    record: any;
    field?: { time: string };
    additionalValue?: any;
    dataFormatType?:string;
  }
  
  export interface IExtraField {
    colspan: string;
    colspanValue: string;
    customStyle?: string;
  }
  