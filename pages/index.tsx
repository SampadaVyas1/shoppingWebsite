import { useContext, useEffect, useState } from "react";
import styles from "../styles/app.module.scss";
import Typography from "@/components/typography";
import AddForm from "@/components/addForm";
import Modal from "@/components/modal";
import Button from "@/components/button";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";

const Home = () => {
  return (
    <div className={styles.components}>
      <Typography variant={TYPOGRAPHY_VARIANT.HEADER_MEDIUM_SEMIBOLD}>
        Welcome!!
      </Typography>
    </div>
  );
};
export default Home;
