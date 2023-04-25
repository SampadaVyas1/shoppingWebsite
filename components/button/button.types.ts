import { BUTTON_SIZES, BUTTON_VARIANT } from "@/common/enums";
import { HtmlHTMLAttributes } from "react";

export interface IButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  startIcon?: string;
  endIcon?: string;
  variant?:
    | BUTTON_VARIANT.TEXT
    | BUTTON_VARIANT.OUTLINED
    | BUTTON_VARIANT.CONTAINED;
  disabled?: boolean;
  customStyle?: string;
  size?: BUTTON_SIZES.LARGE | BUTTON_SIZES.MEDIUM | BUTTON_SIZES.SMALL;
}
