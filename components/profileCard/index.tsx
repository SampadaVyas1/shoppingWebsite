import { useState } from "react";
import Button from "../button";
import ImageComponent from "../image";
import Modal from "../modal";
import Typography from "../typography";
import styles from "./profileCard.module.scss";
import Images from "@/public/assets/icons";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";

interface IProfileCardProps {
  profileImage: string;
  name: string;
  designation: string;
  cardBody: React.ReactNode;
  cardFooter: React.ReactNode;
}

const ProfileCard = (props: IProfileCardProps) => {
  const { profileImage, name, designation, cardBody, cardFooter } = props;

  return (
    <div className={styles.profileCardWrapper}>
      <div className={styles.profileData}>
        <ImageComponent
          src={profileImage}
          fallbackClass={styles.profileImage}
          fallbackText={name.charAt(0)}
          customClass={styles.profileImage}
        />
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}
          customStyle={styles.name}
        >
          {name}
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
