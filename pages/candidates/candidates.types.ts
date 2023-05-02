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
  dataIndex?:string|any,
  key?:string|null,
}

export interface IAdditionalValue {
  colspan: string;
  colspanValue: string;
  customStyle?: string
}
