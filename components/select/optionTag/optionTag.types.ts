import { IOptionType } from "@/common/types";

export interface IOptionTagProps {
  options: IOptionType[];
  onRemove: (values: IOptionType[]) => void;
}
