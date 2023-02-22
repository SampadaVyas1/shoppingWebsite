import { HtmlHTMLAttributes } from "react";
import ImageComponent from "../image";
import styles from "./index.module.scss";

interface IButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  startIcon?: string;
  endIcon?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "2xl" | "xl" | "large" | "medium" | "small";
  disabled?: boolean;
  customStyle?: string;
}

const Button = (props: IButtonProps) => {
  const {
    variant = "outlined",
    startIcon,
    endIcon,
    size,
    children,
    customStyle,
    ...otherProps
  } = props;

  const buttonClass = props.disabled
    ? `${styles.button} ${styles.disabled}`
    : `${styles.button} ${props.customStyle}`;
  return (
    <button
      className={`${styles[variant]} ${buttonClass}`}
      {...otherProps}
      disabled={props.disabled}
    >
      {startIcon && (
        <ImageComponent customClass={styles.iconLeading} src={startIcon} />
      )}
      {children && <div className={styles.buttonLabel}>{children}</div>}
      {endIcon && (
        <ImageComponent customClass={styles.iconTrailing} src={endIcon} />
      )}
    </button>
  );
};
export default Button;
