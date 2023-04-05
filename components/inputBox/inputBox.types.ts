import { HTMLAttributes } from "react";
export interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  customClass?: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  multiline?: boolean;
  handleChange?: (value: any) => void;
  autoFocus?: boolean;
  pattern?: string;
  error?: string;
  startIcon?: string;
}
