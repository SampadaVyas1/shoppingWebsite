import styles from "./button.module.scss";
import ImageComponent from "../image";
import { BUTTON_VARIANT } from "@/common/enums";
import { IButtonProps } from "./button.types";

const Button = (props: IButtonProps) => {
  const {
    variant = BUTTON_VARIANT.OUTLINED,
    startIcon,
    endIcon,
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
      {!!startIcon && (
        <ImageComponent customClass={styles.iconLeading} src={startIcon} />
      )}
      {!!children && <div className={styles.buttonLabel}>{children}</div>}
      {!!endIcon && (
        <ImageComponent customClass={styles.iconTrailing} src={endIcon} />
      )}
    </button>
  );
};
export default Button;
