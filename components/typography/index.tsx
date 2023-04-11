import React, { HTMLAttributes } from "react";
import styles from "./typography.module.scss";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { ITypographyProps } from "./typography.types";

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
