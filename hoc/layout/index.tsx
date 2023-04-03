import styles from "./layout.module.scss";
import { AuthContext } from "@/context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  PRIVATE_ROUTES,
  ADMIN_ROUTES,
  RECRUITER_ROUTES,
  TEAM_ROUTES,
} from "@/common/routes";
import Navbar from "@/components/navbar";
import TeamNavbar from "@/components/teamNavbar";
import Splash from "@/components/splash";

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
          <Navbar routes={role === 1 ? RECRUITER_ROUTES : ADMIN_ROUTES} />
          {router.pathname.includes("/team") ? (
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
