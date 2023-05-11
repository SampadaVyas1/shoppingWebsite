export interface IButtonState {
  [key: string]: { upKeyDisabled: boolean; downKeyDisabled: boolean };
}

export interface IData {
  [key: string]: any;
}

export interface IHeaderTitleProps {
  id: number;
  title: string;
  sort?: boolean | false;
  key: string;
  dataIndex: string;
}

export interface IAdditionalValue {
  colspan: string;
  colspanValue: string;
  customStyle?: string;
}
export interface IShowToggle {
  colspan: string;
  customStyle?: string;
}
