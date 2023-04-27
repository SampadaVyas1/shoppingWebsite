import {
  IAdditionalValue,
  IButtonState,
  IHeaderTitleProps,
} from "@/pages/candidates/candidates.types";

interface ICustomStyle {
  header: {
    row: (props: React.HTMLAttributes<HTMLTableRowElement>[]) => JSX.Element;
  };
}
export interface IHandleRowSelect {
  (value: number[]) : void
}
export interface ITableComponent {
  additionalValue?: IAdditionalValue[];
  data: any[];
  customRowStyling?: string;
  columnHeaderTitle: IHeaderTitleProps[];
  sortbuttonData?: IButtonState;
  dataFormatType?: string;
  fieldforDateFormat?: { time: string };
  customStyle?: ICustomStyle;
  moreverticalIcon?: boolean;
  buttonState?: IButtonState;
  handleUpArrowClick?: (field: string) => void;
  handleDownArrowClick?: (field: string) => void;
  selectedRow: number[];
  handleRowSelect: IHandleRowSelect;
  handleCheckBoxClick: (id: number) => void;
}
