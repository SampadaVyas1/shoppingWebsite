import { IOptionType } from "@/common/types";

export interface IMultiSelectCheckBoxProp {
  options: IOptionType[];
  selectedValues: IOptionType[];
  onSelect?: (value: IOptionType[]) => void;
  masterCheck?: boolean;
  searchable?: boolean;
  customStyle?: string;
}
export interface IMultiSelectCheckBoxState {
  filteredOptions: IOptionType[];
}
