import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import styles from "../styles/app.module.scss";
import Button from "@/components/button";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import SkeletonLoader from "@/components/skeletonLoader";
import { PRIVATE_ROUTES } from "@/common/routes";
import { SKELETON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import Select from "@/components/select";

const Home = () => {
  const context = useContext(AuthContext);

  const { isLoggedIn, handleLogout } = context;
  const router = useRouter();

  const onLogout = () => {
    handleLogout();
    router.replace(PRIVATE_ROUTES.LOGIN);
  };

  return (
    <div className={styles.components}>
      <Typography variant={TYPOGRAPHY_VARIANT.HEADER_MEDIUM_SEMIBOLD}>
        Welcome!!
      </Typography>
      <Button onClick={onLogout}>Logout</Button>
      {!isLoggedIn && <Loader />}
      <div className={styles.profileLoader}>
        <SkeletonLoader type={SKELETON_VARIANT.CIRCLE} />
        <div className={styles.content}>
          <SkeletonLoader type={SKELETON_VARIANT.TEXT_LARGE} />
          <SkeletonLoader type={SKELETON_VARIANT.TEXT_MEDIUM} />
          <SkeletonLoader type={SKELETON_VARIANT.TEXT_SMALL} />
        </div>
      </div>
      <Select
        options={[
          { id: 1, label: "hello" },
          { id: 2, label: "hey" },
          { id: 3, label: "hii" },
        ]}
        multiSelect
      />
    </div>
  );
};
export default Home;
