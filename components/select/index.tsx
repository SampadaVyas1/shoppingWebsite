import { useCallback, useRef, useState } from "react";
import { Popover } from "react-tiny-popover";
import ImageComponent from "../image";
import arrowDown from "../../public/assets/images/arrowDown.svg";
import arrowUp from "../../public/assets/images/arrowUp.svg";
import styles from "./index.module.scss";
import Options from "./options";
import OptionTags from "./optionTag";
import MultiSelectOptions from "./multiselectOptions";

export interface IOptionType {
  id: number;
  label: string;
}

interface ISelectProps {
  options: IOptionType[];
  open?: boolean;
  value?: IOptionType | IOptionType[];
  placeholder?: string;
  onSelect?: (value: IOptionType | IOptionType[]) => void;
  multiSelect?: boolean;
  maxTagCount?: number;
  masterCheck?: boolean;
  searchable?: boolean;
}

interface ISelectStates {
  selectedValue: IOptionType | IOptionType[];
  isDropdownOpen: boolean;
}

const Select = (props: ISelectProps) => {
  const {
    options,
    open = false,
    value,
    placeholder = "Select",
    onSelect,
    multiSelect,
    maxTagCount,
    masterCheck,
    searchable,
  } = props;

  const [selectStates, setSelectStates] = useState<ISelectStates>({
    selectedValue: value ? value : multiSelect ? [] : ({} as IOptionType),
    isDropdownOpen: open || false,
  });

  const selectRef = useRef<HTMLDivElement>(null);

  const { isDropdownOpen, selectedValue } = selectStates;

  const handleOptionSelect = (value: IOptionType) => {
    onSelect && onSelect(value);
    setSelectStates((prevStates) => ({
      ...prevStates,
      selectedValue: value,
      isDropdownOpen: false,
    }));
  };

  const handleMultiSelect = (values: IOptionType[]) => {
    onSelect && onSelect(values);
    setSelectStates((prevStates) => ({
      ...prevStates,
      selectedValue: values,
    }));
  };

  const toggleOptions = () => {
    setSelectStates((prevStates) => ({
      ...prevStates,
      isDropdownOpen: !isDropdownOpen,
    }));
  };

  return (
    <div className={styles.selectOuterWrapper} ref={selectRef}>
      <Popover
        isOpen={isDropdownOpen}
        positions={["bottom", "top"]}
        padding={8}
        reposition={true}
        containerStyle={
          selectRef.current
            ? { width: `${selectRef.current.clientWidth}px` }
            : undefined
        }
        onClickOutside={toggleOptions}
        content={({ position }) => {
          return multiSelect ? (
            <MultiSelectOptions
              options={options}
              selectedValues={
                Array.isArray(selectedValue) ? selectedValue : [selectedValue]
              }
              searchable
              masterCheck={masterCheck}
              onSelect={handleMultiSelect}
            />
          ) : (
            <Options
              options={options}
              selectedValue={
                Array.isArray(selectedValue) ? selectedValue[0] : selectedValue
              }
              onSelect={handleOptionSelect}
            />
          );
        }}
      >
        <div className={styles.selectBox} onClick={toggleOptions}>
          {!Array.isArray(selectedValue) ? (
            <div
              className={
                selectedValue.label ? `${styles.selected}` : styles.label
              }
            >
              {!!selectedValue.label ? selectedValue.label : placeholder}
            </div>
          ) : selectedValue.length ? (
            <OptionTags options={selectedValue} onRemove={handleMultiSelect} />
          ) : (
            <div className={styles.label}>{placeholder}</div>
          )}

          <ImageComponent
            src={isDropdownOpen ? arrowDown : arrowUp}
            customClass={styles.endIcon}
          />
        </div>
      </Popover>
    </div>
  );
};
export default Select;
