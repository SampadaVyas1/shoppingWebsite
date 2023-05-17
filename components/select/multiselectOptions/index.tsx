import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./multiSelectOptions.module.scss";
import Card from "@/components/card";
import ImageComponent from "@/components/image";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import Images from "@/public/assets/icons";
import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";
import { debounce } from "@/common/utils";
import CustomCheckBox from "@/components/customCheckBox";
import { IOptionType } from "@/common/types";
import {
  IMultiSelectOptionsProp,
  IMultiSelectOptionsState,
} from "./multiselectOptions.types";
import { DEBOUNCE_TIME } from "@/common/constants";

const MultiSelectOptions = (props: IMultiSelectOptionsProp) => {
  const {
    options,
    selectedValues,
    onSelect,
    masterCheck,
    searchable,
    customStyle,
  } = props;

  const [multiselectStates, setMultiselectStates] =
    useState<IMultiSelectOptionsState>({
      filteredOptions: options,
    });

  const { filteredOptions } = multiselectStates;

  const handleClick = useCallback(
    (value: IOptionType) =>
      (event: React.SyntheticEvent<Element, Event>, isChecked: boolean) => {
        if (isChecked) {
          onSelect && onSelect([...selectedValues, value]);
        } else {
          onSelect &&
            selectedValues.length &&
            onSelect(selectedValues.filter((option) => option.id !== value.id));
        }
      },
    [onSelect, selectedValues]
  );
  const handleSelectAll = (
    event: React.SyntheticEvent<Element, Event>,
    isChecked: boolean
  ) => {
    if (isChecked) {
      onSelect && onSelect([...options]);
    } else {
      onSelect && onSelect([]);
    }
  };

  const handleSearch = debounce(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      const updatedOptions = options.length
        ? options.filter((data) =>
            data.label.toLowerCase().includes(value.toLowerCase())
          )
        : [];
      setMultiselectStates((prevStates) => ({
        ...prevStates,
        filteredOptions: updatedOptions,
      }));
    },
    DEBOUNCE_TIME.DROPDOWN_SEARCH_DEBOUNCE
  );

  return (
    <Card
      customClass={
        customStyle
          ? `${customStyle} ${styles.optionsWrapper}`
          : styles.optionsWrapper
      }
    >
      <>
        {searchable && (
          <InputBox
            startIcon={Images.search}
            placeholder="Search"
            onChange={handleSearch}
          />
        )}
        {masterCheck && !searchable && (
          <CustomCheckBox
            label="Select All"
            customClass={styles.option}
            checked={
              !!selectedValues.length &&
              selectedValues.length === options.length
            }
            handleClick={handleSelectAll}
          />
        )}
        <div className={styles.multiSelectOptions}>
          {filteredOptions?.length ? (
            filteredOptions?.map((option: IOptionType) => {
              const checkboxClass = selectedValues.includes(option)
                ? `${styles.option} ${styles.selected}`
                : styles.option;
              return (
                <CustomCheckBox
                  id={option.id.toString()}
                  label={option.label}
                  customClass={checkboxClass}
                  key={option.id}
                  checked={
                    !!selectedValues.filter((item) => item.id === option.id)
                      .length
                  }
                  handleClick={handleClick(option)}
                />
              );
            })
          ) : (
            <div className={styles.noData}>
              <ImageComponent src={Images.search} customClass={styles.icon} />
              <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}>
                No results Found
              </Typography>
            </div>
          )}
        </div>
      </>
    </Card>
  );
};
export default React.memo(MultiSelectOptions);
