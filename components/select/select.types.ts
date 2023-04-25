import { IOptionType } from "@/common/types";

export interface ISelectProps {
  options: IOptionType[];
  open?: boolean;
  value?: IOptionType | IOptionType[];
  placeholder?: string;
  onSelect?: (value: IOptionType | IOptionType[]) => void;
  multiSelect?: boolean;
  masterCheck?: boolean;
  searchable?: boolean;
  label?: string;
  error?: string;
}

export interface ISelectStates {
  selectedValue: IOptionType | IOptionType[];
  isDropdownOpen: boolean;
}
