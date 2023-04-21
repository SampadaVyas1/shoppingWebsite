import React, { useState, useEffect, SyntheticEvent } from "react";
import styles from "./checkbox.module.scss";
import ImageComponent from "../imageComponent";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import checkedIcon from "../../public/assets/icons/checked.svg";
import checkboxIdeal from "../../public/assets/icons/checkboxIdeal.svg";

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
    event.stopPropagation();
    const { disabled = false, handleClick } = props;
    if (!disabled) {
      !ideal && setChecked(!checked);
      handleClick && handleClick(event, !checked);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
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
          <ImageComponent
            src={checkedIcon}
            customClass={styles.icon}
            onClick={handleCheckboxClick}
          />
        ) : (
          <div
            className={styles.uncheckedBox}
            onClick={handleCheckboxClick}
          ></div>
        )}
        {label && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
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
