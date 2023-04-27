import React from "react";
import styles from "./emptyState.module.scss";
import ImageComponent from "../../components/image";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { IEmptyStateType } from "@/common/types";

const EmptyState = ({
  title,
  image,
  subTitle = "",
  customImageStyle = "",
}: IEmptyStateType) => {
  return (
    <div className={styles.emptyStateContainer}>
      <div className={styles.imageContainer}>
        <ImageComponent
          src={image}
          customClass={`${styles.notFoundImage} ${customImageStyle}`}
        />
      </div>
      <Typography
        variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}
        customStyle={styles.title}
      >
        {title}
      </Typography>
      {subTitle && (
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
          customStyle={styles.subTitle}
        >
          {subTitle}
        </Typography>
      )}
    </div>
  );
};

export default EmptyState;
