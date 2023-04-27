import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "@/components/navbar";
import TeamNavbar from "@/components/teamNavbar";
import Splash from "@/components/splash";
import styles from "./layout.module.scss";
import {
  PRIVATE_ROUTES,
  ADMIN_ROUTES,
  RECRUITER_ROUTES,
  TEAM_ROUTES,
} from "@/common/routes";
import { TEAM_PAGE_ROUTES } from "@/common/routes";
import { ROLES, TOKEN } from "@/common/constants";
import { getDataFromLocalStorage } from "@/common/utils";

const Layout = ({ children }: any) => {
  const role = ROLES.ADMIN;
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(!!getDataFromLocalStorage(TOKEN));
  }, []);

  return (
    <>
      {router.pathname === PRIVATE_ROUTES.NOT_FOUND_ROUTE ? (
        children
      ) : !isLoggedIn ? (
        <Splash />
      ) : (
        <div className={styles.layoutWrapper}>
          <Navbar
            routes={role === ROLES.ADMIN ? ADMIN_ROUTES : RECRUITER_ROUTES}
          />
          {router.pathname.includes(TEAM_PAGE_ROUTES.TEAM) ? (
            <React.Fragment>
              <TeamNavbar routes={TEAM_ROUTES} />
              {children}
            </React.Fragment>
          ) : (
            children
          )}
        </div>
      )}
    </>
  );
};
export default Layout;
