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
import { TEAM_PAGE_ROUTES } from "@/common/constants";

const Layout = ({ children }: any) => {
  const context = useContext(AuthContext);

  //static data for role based routing
  const role = Math.random();
  const { isLoggedIn } = context;
  const router = useRouter();

  return (
    <>
      {router.pathname === PRIVATE_ROUTES[404] ? (
        children
      ) : !isLoggedIn ? (
        <Splash />
      ) : (
        <div className={styles.layoutWrapper}>
          <Navbar routes={role === 1 ? ADMIN_ROUTES : RECRUITER_ROUTES} />
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
