import { IOptionType } from "..";
import styles from "./index.module.scss";

interface IOptionsProp {
  options: IOptionType[];
  selectedValue: IOptionType;
  onSelect: (value: IOptionType) => void;
}

const Options = (props: IOptionsProp) => {
  const { options, selectedValue, onSelect } = props;

  const handleClick = (value: IOptionType) => () => {
    onSelect(value);
  };
  return (
    <div className={styles.optionsWrapper}>
      {options.map((option: IOptionType) => {
        return (
          <div
            className={
              option.id === selectedValue.id
                ? `${styles.option} ${styles.selected}`
                : styles.option
            }
            key={option.id}
            onClick={handleClick(option)}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};
export default Options;
