import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import Images from "@/public/assets/icons";
import React, { Component } from "react";
import ImageComponent from "../image";
import Typography from "../typography";
import styles from "./splash.module.scss";

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
