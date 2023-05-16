import React, { useRef, useState } from "react";
import { Popover } from "react-tiny-popover";
import styles from "./select.module.scss";
import Options from "./options";
import ImageComponent from "../image";
import Typography from "../typography";
import OptionTags from "./optionTag";
import MultiSelectOptions from "./multiselectOptions";
import arrowDown from "../../public/assets/icons/arrowDown.svg";
import arrowUp from "../../public/assets/icons/arrowUp.svg";
import { IOptionType } from "@/common/types";
import { ISelectProps, ISelectStates } from "./select.types";
import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";

const Select = (props: ISelectProps) => {
  const {
    options,
    open = false,
    value,
    label,
    error,
    placeholder = "Select",
    onSelect,
    multiSelect = false,
    masterCheck = false,
    searchable = false,
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
      {label && <div className={styles.label}>{label}</div>}
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
              searchable={searchable}
              masterCheck={masterCheck}
              onSelect={handleMultiSelect}
            />
          ) : (
            <Options
              options={options}
              searchable={searchable}
              selectedValue={
                Array.isArray(selectedValue) ? selectedValue[0] : selectedValue
              }
              onSelect={handleOptionSelect}
            />
          );
        }}
      >
        <div
          className={
            isDropdownOpen
              ? `${styles.focused} ${styles.selectBox}`
              : styles.selectBox
          }
          onClick={toggleOptions}
        >
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
      {error && (
        <Typography variant={TYPOGRAPHY_VARIANT.ERROR}>{error}</Typography>
      )}
    </div>
  );
};
export default Select;
