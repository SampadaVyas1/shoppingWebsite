import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import ImageComponent from "@/components/image";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import Images from "@/public/assets/images";
import { useState } from "react";
import { IOptionType } from "..";
import styles from "./index.module.scss";

interface IOptionsProp {
  options: IOptionType[];
  selectedValue: IOptionType;
  searchable?: boolean;
  onSelect: (value: IOptionType) => void;
}

const Options = (props: IOptionsProp) => {
  const { options, selectedValue, onSelect, searchable } = props;

  const [filteredOptions, setFilteredOptions] =
    useState<IOptionType[]>(options);

  const handleClick = (value: IOptionType) => () => {
    onSelect(value);
  };

  const handleSearch = (value: string) => {
    const updatedOptions = options.filter((data) =>
      data.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(updatedOptions);
  };

  return (
    <div className={styles.optionsWrapper}>
      {searchable && (
        <InputBox
          startIcon={Images.search}
          placeholder="Search"
          handleChange={handleSearch}
        />
      )}
      {filteredOptions?.length ? (
        filteredOptions.map((option: IOptionType) => {
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
        })
      ) : (
        <div className={styles.noData}>
          <ImageComponent src={Images.search} customClass={styles.icon} />
          <Typography variant={TYPOGRAPHY_VARIANT.SUBTITLE_18}>
            No results Found
          </Typography>
        </div>
      )}
    </div>
  );
};
export default Options;
