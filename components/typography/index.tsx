import { VARIANT_TYPE } from "@/common/constants";
import React, { HTMLAttributes } from "react";
import styles from "./index.module.scss";

interface ITypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: any;
  variant?:
    | "header"
    | "subHeader"
    | "title"
    | "body"
    | "body1"
    | "text"
    | "captions"
    | "error"
    | "headline32"
    | "headline24"
    | "headline16"
    | "subtitle16"
    | "subtitle18"
    | "supportingText"
    | "buttonText"
    | "inputLabel"
    | "chipTextSemibold"
    | "chipText";
  customStyle?: string;
}

class Typography extends React.Component<ITypographyProps> {
  render() {
    const { variant = VARIANT_TYPE.SUBTITLE_16, customStyle, ...otherProps } = this.props;

    return (
      <div className={`${styles[variant]} ${customStyle}`} {...otherProps}>
        {this.props.children}
      </div>
    );
  }
}

export default Typography;
