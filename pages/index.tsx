import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import styles from "../styles/app.module.scss";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import { PRIVATE_ROUTES } from "@/common/routes";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";

const Home = () => {
  const context = useContext(AuthContext);

  const { isLoggedIn, handleLogout } = context;
  const router = useRouter();

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
