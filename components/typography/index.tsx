import React, { HTMLAttributes } from "react";
import styles from "./typography.module.scss";
import { ITypographyProps } from "./typography.types";
import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";

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
