export interface ITableCells {
  dataIndex: string;
  record: any;
  field: { time: string };
  colspans: { colspan: string; colspanValue: string; customStyle?: string }[];
}
