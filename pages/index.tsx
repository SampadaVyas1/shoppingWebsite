import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import Button from "@/components/button";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import SkeletonLoader from "@/components/skeletonLoader";
import ROUTES from "@/common/routes";
import Images from "@/public/assets/icons";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import styles from "../styles/app.module.scss";

const Home = () => {
  const context = useContext(AuthContext);

  const { isLoggedIn, handleLogout } = context;
  const router = useRouter();

  const onLogout = () => {
    handleLogout();
    router.replace(ROUTES.LOGIN);
  };

  return (
    <div className={styles.components}>
      <Typography variant={TYPOGRAPHY_VARIANT.HEADER_MEDIUM_SEMIBOLD}>
        Welcome!!
      </Typography>
      <Button onClick={onLogout}>Logout</Button>
      {!isLoggedIn && <Loader />}
      <div className={styles.profileLoader}>
        <SkeletonLoader type="circle" />
        <div className={styles.content}>
          <SkeletonLoader type="textLarge" />
          <SkeletonLoader type="textMedium" />
          <SkeletonLoader type="textSmall" />
        </div>
      </div>
    </div>
  );
};
export default Home;
