import {
  HTMLInputProps,
  HTMLInputTextareaProps,
  HTMLTextareaProps,
} from "@/common/types";
import { ChangeEvent, HTMLAttributes, MouseEvent, FocusEvent } from "react";

export interface IInputProps extends HTMLInputTextareaProps {
  customClass?: string;
  startIcon?: string;
  endIcon?: string;
  multiline?: boolean;
  label?: string;
  error?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onStartIconClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onEndIconClick?: (event: MouseEvent<HTMLDivElement>) => void;
  rows?: number;
  wrap?: "hard" | "soft";
  inputProps?: HTMLInputProps;
  textAreaProps?: HTMLTextareaProps;
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
