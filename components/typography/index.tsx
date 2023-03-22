import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import React, { HTMLAttributes } from "react";
import styles from "./typography.module.scss";

interface ITypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: JSX.Element | string;
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

const Typography = (props: ITypographyProps) => {
  const {
    variant = TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR,
    customStyle,
    children,
    ...otherProps
  } = props;

  return (
    <div className={`${styles[variant]} ${customStyle}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Typography;
