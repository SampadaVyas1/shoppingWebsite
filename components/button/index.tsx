import styles from "./button.module.scss";
import ImageComponent from "../imageComponent";
import { IButtonProps } from "./button.types";
import {
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANT,
} from "@/common/types/enums";

const Button = (props: IButtonProps) => {
  const {
    variant = BUTTON_VARIANT.OUTLINED,
    startIcon,
    size = BUTTON_SIZES.MEDIUM,
    endIcon,
    children,
    customStyle,
    type = BUTTON_TYPES.BUTTON,
    ...otherProps
  } = props;

  const buttonClass = props.disabled
    ? `${styles.button} ${styles.disabled}`
    : `${styles.button} ${props.customStyle}`;
  return (
    <button
      className={`${styles[variant]} ${buttonClass} ${styles[size]}`}
      {...otherProps}
      type={type}
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
