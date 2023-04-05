import { SyntheticEvent } from "react";
export interface ICheckBoxProps {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  handleClick?: (event: SyntheticEvent, check: boolean) => void;
  customClass?: string;
  id?: string;
  ideal?: boolean;
}
