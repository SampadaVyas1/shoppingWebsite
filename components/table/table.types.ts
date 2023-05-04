import {
  IAdditionalValue,
  IButtonState,
  IData,
  IHeaderTitleProps,
} from "@/pages/candidates/candidates.types";

interface ICustomStyle {
  header: {
    row: (props: React.HTMLAttributes<HTMLTableRowElement>[]) => JSX.Element;
  };
}
export interface IHandleRowSelect {
  (value: number[]): void;
}
export interface IHandleRowEachSelect {
  row: number;
  selectedRow: number[];
  onSelectedRowChange: (value: number[]) => void;
}
export interface ITableComponent {
  additionalValue?: IAdditionalValue[];
  data: IData[];
  customRowStyling?: string;
  columnHeaderTitle: any[];
  sortbuttonData?: IButtonState;
  dataFormatType?: string;
  fieldforDateFormat?: { time: string };
  customStyle?: ICustomStyle;
  moreverticalIcon?: boolean;
  buttonState?: IButtonState;
  handleSortArrowClick?:(field:string,sortType:string)=>void;
  selectedRow: number[];
  handleRowSelect: IHandleRowSelect;
  handleRowEachSelect: (row: number,selectedRow: number[],onSelectedRowChange: (value: number[]) => void)=>void;
 
}
