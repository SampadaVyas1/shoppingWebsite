import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/app.module.scss";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { useAppSelector } from "@/redux/hooks";

const Home = () => {
  const { isLoggedIn } = useAppSelector((state) => state.login);

  return (
    <div className={styles.components}>
      <Typography variant={TYPOGRAPHY_VARIANT.HEADER_MEDIUM_SEMIBOLD}>
        Welcome!!
      </Typography>
      {!isLoggedIn && <Loader />}
    </div>
  );
};
export default Home;
