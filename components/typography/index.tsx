import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import React, { HTMLAttributes } from "react";
import styles from "./typography.module.scss";

interface ITypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: any;
  variant?:
    | TYPOGRAPHY_VARIANT.HEADER
    | TYPOGRAPHY_VARIANT.SUBHEADER
    | TYPOGRAPHY_VARIANT.BODY
    | TYPOGRAPHY_VARIANT.BUTTON_TEXT
    | TYPOGRAPHY_VARIANT.CAPTIONS
    | TYPOGRAPHY_VARIANT.TEXT
    | TYPOGRAPHY_VARIANT.ERROR
    | TYPOGRAPHY_VARIANT.INPUT_LABEL
    | TYPOGRAPHY_VARIANT.CHIP_TEXT
    | TYPOGRAPHY_VARIANT.CHIP_TEXT_SEMIBOLD
    | TYPOGRAPHY_VARIANT.SUPPORTING_TEXT
    | TYPOGRAPHY_VARIANT.HEADLINE_16
    | TYPOGRAPHY_VARIANT.HEADLINE_24
    | TYPOGRAPHY_VARIANT.HEADLINE_32
    | TYPOGRAPHY_VARIANT.SUBTITLE_16
    | TYPOGRAPHY_VARIANT.SUBTITLE_18
    | TYPOGRAPHY_VARIANT.TITLE;
  customStyle?: string;
}

const Typography = (props: ITypographyProps) => {
  const {
    variant = TYPOGRAPHY_VARIANT.SUBTITLE_16,
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
