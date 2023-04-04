import { SyntheticEvent, useEffect, useState } from "react";
import styles from "./customCheckBox.module.scss";

interface ICheckBoxProps {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  handleClick?: (event: SyntheticEvent, check: boolean) => void;
  customClass?: string;
  id?: string;
  ideal?: boolean;
}

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
        type="checkbox"
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
