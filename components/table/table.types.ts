import {
  IAdditionalValue,
  IButtonState,
  IData,
  IHeaderTitleProps,
  IShowToggle,
} from "@/common/candidates.types";

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
  loading?: boolean;
  data: IData[];
  customRowStyling?: string;
  columnHeaderTitle: any[];
  sortbuttonData?: IButtonState;
  dataFormatType?: string;
  fieldforDateFormat?: { time: string };
  customStyle?: ICustomStyle;
  showToggle?: IShowToggle;
  moreverticalIcon?: boolean;
  buttonState?: IButtonState;
  handleSortArrowClick?: (field: string, sortType: string, data: any) => void;
  selectedRow?: number[];
  handleRowSelect?: IHandleRowSelect;
  onSwitchToggle?: (data: any) => void;
  isLoading?: boolean;
  handleRowEachSelect?: (
    row: number,
    selectedRow: number[],
    onSelectedRowChange: (value: number[]) => void
  ) => void;
  hoverCell?: string;
}
