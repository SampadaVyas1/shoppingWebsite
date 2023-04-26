export interface ITable {
    dataIndex: string;
    data: any;
    field?: { time: string };
    additionalValue?: any;
    dataFormatType?:string;
    index:number
  }
  
  export interface IExtraField {
    colspan: string;
    colspanValue: string;
    customStyle?: string;
  }
  