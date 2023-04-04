import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import styles from "../styles/app.module.scss";
import Button from "@/components/button";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import SkeletonLoader from "@/components/skeletonLoader";
import Select from "@/components/select";
import { getDummyData } from "@/services/login.service";
import { PRIVATE_ROUTES } from "@/common/routes";
import { SKELETON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";

const Home = () => {
  const context = useContext(AuthContext);

  const { isLoggedIn, handleLogout } = context;
  const router = useRouter();

  const onLogout = () => {
    handleLogout();
    router.replace(PRIVATE_ROUTES.LOGIN);
  };

  const getData = async () => {
    const response = await getDummyData();
    console.log(response);
  };

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
