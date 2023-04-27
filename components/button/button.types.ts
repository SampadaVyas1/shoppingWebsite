import { HtmlHTMLAttributes } from "react";
import { BUTTON_TYPES, BUTTON_VARIANT, BUTTON_SIZES } from "@/common/enums";

export interface IButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  startIcon?: string;
  endIcon?: string;
  variant?:
    | BUTTON_VARIANT.TEXT
    | BUTTON_VARIANT.OUTLINED
    | BUTTON_VARIANT.CONTAINED;
  disabled?: boolean;
  customStyle?: string;
  size?: BUTTON_SIZES.LARGE | BUTTON_SIZES.MEDIUM | BUTTON_SIZES.SMALL;
  type?: BUTTON_TYPES.RESET | BUTTON_TYPES.SUBMIT | BUTTON_TYPES.BUTTON;
}
