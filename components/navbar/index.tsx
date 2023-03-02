import styles from "./navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import ImageComponent from "../image";
import Images from "@/public/assets/icons";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { IRouteType } from "@/common/types";

interface INavbarProps {
  routes: IRouteType[];
}

const Navbar = ({ routes }: INavbarProps) => {
  const router = useRouter();
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div className={styles.logo}>
          <ImageComponent src={Images.coditasIcon} width={32} height={32} />
          <Typography
            variant={TYPOGRAPHY_VARIANT.HEADER_LARGE}
            customStyle={styles.header}
          >
            Candidate Connect
          </Typography>
        </div>
        {routes?.map((route) => {
          const routeClassName =
            route.path === router.pathname
              ? `${styles.active} ${styles.route}`
              : styles.route;
          return (
            <Link href={route.path} className={routeClassName} key={route.id}>
              {route.name}
            </Link>
          );
        })}
      </div>
      <div className={styles.navbarRight}>
        <ImageComponent
          src={Images.notificationIcon}
          customClass={styles.icons}
        />
        <ImageComponent src={Images.profileIcon} customClass={styles.icons} />
      </div>
    </div>
  );
};
export default Navbar;
