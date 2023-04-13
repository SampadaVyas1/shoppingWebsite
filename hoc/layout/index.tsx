import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";

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
import { ROLES } from "@/common/constants";

const Layout = ({ children }: any) => {
  const context = useContext(AuthContext);

  //static data for role based routing
  const role = ROLES.ADMIN;
  const { isLoggedIn } = context;
  const router = useRouter();

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
