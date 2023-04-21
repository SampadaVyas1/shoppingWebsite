export interface ITable {
  dataIndex: string;
  record: any;
  field: { time: string };
  colspans: { colspan: string; colspanValue: string; customStyle?: string }[];
}

export interface IExtraField {
  colspan: string;
  colspanValue: string;
  customStyle?: string;
}
