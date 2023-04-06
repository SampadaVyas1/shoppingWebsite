import { IOptionType } from "@/common/types";

export interface IMultiSelectOptionsProp {
  options: IOptionType[];
  selectedValues: IOptionType[];
  onSelect?: (value: IOptionType[]) => void;
  masterCheck?: boolean;
  searchable?: boolean;
  customStyle?: string;
}
export interface IMultiSelectOptionsState {
  filteredOptions: IOptionType[];
}
