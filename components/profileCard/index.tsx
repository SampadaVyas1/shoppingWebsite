import { useState } from "react";
import Button from "../button";
import ImageComponent from "../imageComponent";
import Modal from "../modal";
import Typography from "../typography";
import styles from "./profileCard.module.scss";
import Images from "@/public/assets/icons";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import { IProfileCardProps } from "./profileCard.types";

const ProfileCard = (props: IProfileCardProps) => {
  const {
    profileImage,
    firstName,
    lastName,
    designation,
    cardBody,
    cardFooter,
  } = props;

  return (
    <div className={styles.profileCardWrapper}>
      <div className={styles.profileData}>
        <ImageComponent
          src={profileImage}
          fallbackClass={styles.profileImage}
          fallbackText={`${firstName.charAt(0)}${lastName.charAt(0)}`}
          customClass={styles.profileImage}
        />
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}
          customStyle={styles.name}
        >
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
          customStyle={styles.designation}
        >
          {designation}
        </Typography>
        {cardBody}
      </div>
      {cardFooter}
    </div>
  );
};
export default ProfileCard;
