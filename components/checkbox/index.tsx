import React, { useState, useEffect, SyntheticEvent } from "react";
import checkedIcon from "../../public/assets/images/checked.svg";
import checkboxIdeal from "../../public/assets/images/checkboxIdeal.svg";
import styles from "./index.module.scss";
import ImageComponent from "../image";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";

interface props {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  handleClick?: (event: SyntheticEvent, check: boolean) => void;
  customClass?: string;
  id?: string;
  ideal?: boolean;
  tabIndex?: boolean;
}

const CheckBox = (props: props) => {
  const {
    checked: check = false,
    label = null,
    disabled = false,
    ideal = false,
    handleClick,
    customClass,
    tabIndex = false,
    ...otherProps
  } = props;
  const [checked, setChecked] = useState(check);

  const handleCheckboxClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const { disabled = false, handleClick } = props;
    if (!disabled) {
      !ideal && setChecked(!checked);
      handleClick && handleClick(event, !checked);
    }
  };

  const handleKeyPress = (e: any) => {
    const { disabled = false, handleClick } = props;
    if (!disabled && e.keyCode == 13) {
      setChecked(!checked);
      handleClick && handleClick(e, !checked);
    }
  };

  useEffect(() => {
    setChecked(check);
  }, [check]);

  return (
    <div className={customClass}>
      <span
        tabIndex={tabIndex ? 0 : -1}
        className={
          disabled
            ? `${styles.checkbox} ${styles.checkboxDisabled}`
            : styles.checkbox
        }
        onClick={handleCheckboxClick}
        onKeyDown={handleKeyPress}
        {...otherProps}
      >
        {ideal ? (
          <ImageComponent src={checkboxIdeal} customClass={styles.icon} />
        ) : checked ? (
          <ImageComponent src={checkedIcon} customClass={styles.icon} />
        ) : (
          <div className={styles.uncheckedBox}></div>
        )}
        {label && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT}
            customStyle={styles.checkboxLabel}
          >
            {label}
          </Typography>
        )}
      </span>
    </div>
  );
};

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
};

export default CheckBox;
