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
}

export interface IAdditionalValue {
  colspan: string;
  colspanValue: string;
  customStyle?: string;
}
