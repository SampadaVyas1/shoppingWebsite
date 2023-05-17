import styles from "./switch.module.scss";

interface ISwitchProps {
  active: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  name?: string;
}

const Switch = (props: ISwitchProps) => {
  const handleChange = () => {
    if (!props.disabled) {
      props.onChange(!props.active);
    }
  };
  const handleCheckboxChange = () => {};
  return (
    <div className={styles.toggleSwitch} onClick={handleChange}>
      <input
        type="checkbox"
        className={styles.toggleSwitchCheckbox}
        name={props.name}
        checked={props.active}
        onChange={handleCheckboxChange}
        disabled={props.disabled}
        id={props.name}
      />
      <label
        className={
          props.disabled
            ? `${styles.disabled} ${styles.toggleSwitchLabel}`
            : styles.toggleSwitchLabel
        }
        htmlFor={props.name}
      >
        <span className={styles.toggleSwitchInner} />
        <span className={styles.toggleSwitchCircle} />
      </label>
    </div>
  );
};

export default Switch;
