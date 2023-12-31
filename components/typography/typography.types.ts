import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";
import { HTMLAttributes } from "react";

export interface ITypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?:
    | TYPOGRAPHY_VARIANT.HEADER_LARGE
    | TYPOGRAPHY_VARIANT.HEADER_MEDIUM_SEMIBOLD
    | TYPOGRAPHY_VARIANT.HEADER_SMALL_SEMIBOLD
    | TYPOGRAPHY_VARIANT.HEADER_SMALL
    | TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM
    | TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR
    | TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD
    | TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR
    | TYPOGRAPHY_VARIANT.TEXT_SMALL_MEDIUM
    | TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR
    | TYPOGRAPHY_VARIANT.TEXT_SMALL_SEMIBOLD
    | TYPOGRAPHY_VARIANT.ERROR;

  customStyle?: string;
}
