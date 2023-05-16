import { SyntheticEvent, useEffect, useState } from "react";
import styles from "./customCheckBox.module.scss";
import { ICheckBoxProps } from "./customCheckBox.types";
import { FORM_CONSTANTS } from "@/common/constants";

const CustomCheckBox = (props: ICheckBoxProps) => {
  const {
    checked: check = false,
    label = null,
    disabled = false,
    ideal = false,
    handleClick,
    id = "",
    customClass,
  } = props;
  const [checked, setChecked] = useState(check);

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { disabled = false, handleClick } = props;
    if (!disabled) {
      !ideal && setChecked(!checked);
      handleClick && handleClick(event, !checked);
    }
  };
  useEffect(() => {
    setChecked(check);
  }, [check]);
  return (
    <div className={`${styles.checkbox} ${customClass}`}>
      <input
        type={FORM_CONSTANTS.CHECKBOX}
        disabled={disabled}
        id={id}
        checked={checked}
        onChange={handleCheckboxClick}
      />
      {label && (
        <label className={styles.checkboxLabel} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};
export default CustomCheckBox;
