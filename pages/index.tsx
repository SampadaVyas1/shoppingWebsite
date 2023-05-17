import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/app.module.scss";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import { useAppSelector } from "@/redux/hooks";
import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";
import Switch from "@/components/switch";

const Home = () => {
  const { isLoggedIn } = useAppSelector((state) => state.login);
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className={styles.components}>
      <Typography variant={TYPOGRAPHY_VARIANT.HEADER_MEDIUM_SEMIBOLD}>
        Welcome!!
      </Typography>
      {!isLoggedIn && <Loader />}
      <Switch active={active} onChange={() => setActive(!active)} />
    </div>
  );
};
export default Home;
