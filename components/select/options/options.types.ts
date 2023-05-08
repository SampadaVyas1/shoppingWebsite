import { IOptionType } from "@/common/types";

export interface IOptionsProp {
  options: IOptionType[];
  selectedValue: IOptionType | null;
  searchable?: boolean;
  onSelect: (value: IOptionType) => void;
  customStyle?: string;
}
