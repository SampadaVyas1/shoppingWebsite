/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
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
import { TOKEN } from "@/common/constants";
import { getDataFromLocalStorage } from "@/common/utils";
import { useDispatch } from "react-redux";
import { sagaActions } from "@/redux/actions";
import { useAppSelector } from "@/redux/hooks";
import { ROLES } from "@/common/types/enums";

const Layout = ({ children }: any) => {
  const dispatch = useDispatch();
  const { role: userRole } = useAppSelector((state) => state.login.userDetails);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string>(ROLES.RECRUITER);
  const router = useRouter();

  const checkLoggedIn = () => {
    try {
      const userData: any = jwt_decode(`${getDataFromLocalStorage(TOKEN)}`);
      setRole(userData.role);
    } catch (error) {
      console.log(error);
    }
    setLoggedIn(!!getDataFromLocalStorage(TOKEN));
  };

  useEffect(() => {
    checkLoggedIn();
  }, [dispatch, userRole]);

  useEffect(() => {
    if (router.pathname !== PRIVATE_ROUTES.LOGIN) {
      dispatch({ type: sagaActions.FETCH_ROLE });
      dispatch({ type: sagaActions.GET_USER_DETAILS });
    }
  }, [dispatch]);

  useEffect(() => {
    if (router.pathname === "/messages" && role === ROLES.ADMIN) {
      router.replace(PRIVATE_ROUTES.NOT_FOUND_ROUTE);
    }
  }, [role, router]);

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
