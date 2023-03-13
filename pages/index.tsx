import { useContext, useEffect, useState } from "react";
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
import Switch from "@/components/switch";
import HoverCard from "@/components/hoverCard";
import Card from "@/components/card";

const Home = () => {
  const context = useContext(AuthContext);

  const { isLoggedIn, handleLogout } = context;
  const router = useRouter();

  const [checked, setChecked] = useState<boolean>(true);

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
      <Switch
        active={checked}
        disabled={true}
        onChange={(value: boolean) => setChecked(value)}
      />
      <HoverCard
        component={
          <Card>
            <>hello</>
          </Card>
        }
      >
        <div className={`${styles.tooltipContent}`}>
          Hi Yuvika, Im a recruiter from Coditas, reaching out to you regarding
          an exciting opportunity with us! We’re a Pune-based digital
          engineering company and a certified Great Place to Work that provides
          business solutions through UX Design and software development. You
          seem like a great fit for the position based on your profile. If
          you’re looking for a job change, Id love to discuss the details and
          see if they align with your career aspirations.
        </div>
      </HoverCard>
    </div>
  );
};
export default Home;
