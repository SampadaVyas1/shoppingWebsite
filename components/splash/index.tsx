import React from "react";
import styles from "./splash.module.scss";
import ImageComponent from "../imageComponent";
import Typography from "../typography";
import Images from "@/public/assets/icons";
import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";

const Splash = () => {
  return (
    <div className={styles.splashPage}>
      <ImageComponent src={Images.coditasIcon} />
      <Typography
        variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}
        customStyle={styles.splashText}
      >
        Candidate Connect
      </Typography>
    </div>
  );
};

export default Splash;
