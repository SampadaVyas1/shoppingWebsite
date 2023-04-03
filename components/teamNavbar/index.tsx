import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./teamNavbar.module.scss";
import { IRouteType } from "@/common/types";

import React from "react";

interface INavbarProps {
  routes: IRouteType[];
}

const TeamNavbar = ({ routes }: INavbarProps) => {
  const router = useRouter();
  return (
    <div className={styles.teamNavbarContainer}>
      <div className={styles.teanNavbarContent}>
        {!!routes.length &&
          routes?.map((route) => {
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
    </div>
  );
};
export default TeamNavbar;
