import { IOptionType } from "@/common/types";

export interface IOptionsProp {
  options: IOptionType[];
  selectedValue: IOptionType;
  searchable?: boolean;
  onSelect: (value: IOptionType) => void;
}
