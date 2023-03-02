/* eslint-disable react-hooks/exhaustive-deps */
import { TOKEN } from "@/common/constants";
import ROUTES from "@/common/routes";
import { getDataFromLocalStorage } from "@/common/utils";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../layout";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();

  const isLoggedIn =
    !!getDataFromLocalStorage(TOKEN) || ROUTES.hasOwnProperty(router.pathname);

  useEffect(() => {
    if (!isLoggedIn && router.pathname !== ROUTES[404]) {
      router.replace(ROUTES.LOGIN);
    } else if (isLoggedIn && router.pathname === ROUTES.LOGIN) {
      router.back();
    }
  }, [isLoggedIn]);

  return <Layout>{children}</Layout>;
};
export default ProtectedRoute;
