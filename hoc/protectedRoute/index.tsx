/* eslint-disable react-hooks/exhaustive-deps */
import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import { PRIVATE_ROUTES } from "@/common/routes";
import { getDataFromLocalStorage } from "@/common/utils";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../layout";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();

  const isLoggedIn =
    !!getDataFromLocalStorage(REFRESH_TOKEN) ||
    PRIVATE_ROUTES.hasOwnProperty(router.pathname);

  useEffect(() => {
    if (!isLoggedIn && router.pathname !== PRIVATE_ROUTES.NOT_FOUND_ROUTE) {
      router.replace(PRIVATE_ROUTES.LOGIN);
    } else if (isLoggedIn && router.pathname === PRIVATE_ROUTES.LOGIN) {
      router.back();
    }
  }, [isLoggedIn]);

  return <Layout>{children}</Layout>;
};
export default ProtectedRoute;
