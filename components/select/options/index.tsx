import React, { useState } from "react";
import styles from "./options.module.scss";
import Card from "@/components/card";
import ImageComponent from "@/components/imageComponent";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import Images from "@/public/assets/icons";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { debounce } from "@/common/utils";
import { IOptionType } from "@/common/types";
import { IOptionsProp } from "./options.types";

const Options = (props: IOptionsProp) => {
  const { options, selectedValue, onSelect, searchable } = props;

  const [filteredOptions, setFilteredOptions] =
    useState<IOptionType[]>(options);

  const handleClick = (value: IOptionType) => () => {
    onSelect(value);
  };

  const handleSearch = debounce((value: string) => {
    const updatedOptions = options.filter((data) =>
      data.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(updatedOptions);
  }, 300);

  return (
    <Card customClass={styles.optionsWrapper}>
      <>
        {searchable && (
          <InputBox
            startIcon={Images.search}
            placeholder="Search"
            handleChange={handleSearch}
          />
        )}
        <div className={styles.singleSelectOptions}>
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
export default React.memo(Options);
