import React from "react";
import styles from "./emptyState.module.scss";
import ImageComponent from "../../components/imageComponent";
import Typography from "../typography";
import { IEmptyStateType } from "@/common/types";
import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";

const EmptyState = ({
  title,
  image,
  subTitle = "",
  customImageStyle = "",
  heading
}: IEmptyStateType) => {
  return (
    <div className={styles.emptyStateContainer}>
     <Typography variant={TYPOGRAPHY_VARIANT.HEADER_LARGE}  customStyle={styles.error404}>{heading}</Typography>
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
