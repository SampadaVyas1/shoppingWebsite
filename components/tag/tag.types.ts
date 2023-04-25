export interface ITagProps {
  active?: boolean;
  customClass?: string;
  onClick?: any;
  tagValue: ITagType;
}
export interface ITagType {
  id: string;
  label: string;
}
