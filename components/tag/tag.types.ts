export interface ITagProps {
  active?: boolean;
  customClass?: string;
  onClick?: any;
  tagValue: ITagType;
  onDelete?: () => void;
}
export interface ITagType {
  id: string | number;
  label: string;
}
