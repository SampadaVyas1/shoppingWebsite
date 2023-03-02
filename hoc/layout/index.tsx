import styles from "./layout.module.scss";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ROUTES, { ADMIN_ROUTES, RECRUITER_ROUTES } from "@/common/routes";
import Navbar from "@/components/navbar";
import Splash from "@/components/splash";

const Layout = ({ children }: any) => {
  const context = useContext(AuthContext);

  //static data for role based routing
  const role = Math.random();
  const { isLoggedIn } = context;
  const router = useRouter();

  return (
    <>
      {router.pathname === ROUTES[404] ? (
        children
      ) : !isLoggedIn ? (
        <Splash />
      ) : (
        <div className={styles.layoutWrapper}>
          <Navbar routes={role === 1 ? ADMIN_ROUTES : RECRUITER_ROUTES} />
          {children}
        </div>
      )}
    </>
  );
};
export default Layout;
