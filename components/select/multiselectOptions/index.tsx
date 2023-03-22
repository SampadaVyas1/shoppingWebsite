import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { debounce } from "@/common/utils";
import Card from "@/components/card";
import CheckBox from "@/components/checkbox";
import ImageComponent from "@/components/image";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import Images from "@/public/assets/icons";
import { useCallback, useState } from "react";
import { IOptionType } from "..";
import styles from "./multiSelectOptions.module.scss";

interface IMultiSelectOptionsProp {
  options: IOptionType[];
  selectedValues: IOptionType[];
  onSelect?: (value: IOptionType[]) => void;
  masterCheck?: boolean;
  searchable?: boolean;
  customStyle?: string;
}

interface IMultiSelectOptionsState {
  filteredOptions: IOptionType[];
}

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

  const handleSearch = debounce((value: string) => {
    const updatedOptions = options.filter((data) =>
      data.label.toLowerCase().includes(value.toLowerCase())
    );
    setMultiselectStates((prevStates) => ({
      ...prevStates,
      filteredOptions: updatedOptions,
    }));
  }, 300);

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
            handleChange={handleSearch}
          />
        )}
        {masterCheck && !searchable && (
          <CheckBox
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
              return (
                <CheckBox
                  label={option.label}
                  customClass={styles.option}
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
export default MultiSelectOptions;
