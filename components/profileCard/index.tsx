import { useState } from "react";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import Images from "@/public/assets/icons";
import Button from "../button";
import ImageComponent from "../image";
import Modal from "../modal";
import Typography from "../typography";
import styles from "./profileCard.module.scss";

const ProfileCard = (props: any) => {
  const { profileImage, name, designation, email, phone } = props;

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
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
          customStyle={styles.email}
        >
          <>
            Email : <span>{email}</span>
          </>
        </Typography>
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
          customStyle={styles.email}
        >
          <>
            Phone : <span>{phone}</span>
          </>
        </Typography>
      </div>
      <Button
        variant={BUTTON_VARIANT.OUTLINED}
        startIcon={Images.logoutIcon}
        customStyle={styles.logoutButton}
        onClick={props.onLogoutClick}
      >
        Log Out
      </Button>
    </div>
  );
};
export default ProfileCard;
