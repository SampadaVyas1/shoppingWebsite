import { HTMLAttributes } from "react";
export interface IInputProps
  extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  customClass?: string;
  label?: string;
  value?: any;
  type?: string;
  disabled?: boolean;
  multiline?: boolean;
  onChange?: (value: any) => void;
  autoFocus?: boolean;
  pattern?: string;
  error?: string;
  startIcon?: string;
}
