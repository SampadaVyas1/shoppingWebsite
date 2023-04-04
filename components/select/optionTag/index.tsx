import React, { useCallback } from "react";
import styles from "./optionTag.module.scss";
import ImageComponent from "../../image";
import Images from "@/public/assets/icons";
import { IOptionType } from "..";

interface IOptionTagProps {
  options: IOptionType[];
  onRemove: (values: IOptionType[]) => void;
}

const OptionTags = (props: IOptionTagProps) => {
  const { options, onRemove } = props;
  const { close } = Images;

  const handleTagRemove = useCallback(
    (value: IOptionType) => (event: React.MouseEvent) => {
      event.stopPropagation();
      onRemove(options.filter((option) => option.id !== value.id));
    },
    [onRemove, options]
  );
  return (
    <div className={styles.optionTagWrapper}>
      {options.map((option) => (
        <div className={styles.optionTag} key={option.id}>
          <div className={styles.label}>{option.label}</div>
          <ImageComponent
            customClass={styles.cross}
            src={close}
            onClick={handleTagRemove(option)}
          />
        </div>
      ))}
    </div>
  );
};
export default OptionTags;