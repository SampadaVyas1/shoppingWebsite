export interface ITableCells {
  dataIndex: string;
  data: any;
  index: number;
  field: { time: string };
  colspans: { colspan: string; colspanValue: string; customStyle?: string }[];
}
