import ROUTES from "@/common/routes";
import { AuthContext } from "@/context/authContext";
import Login from "@/pages/login";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const context = useContext(AuthContext);
  const isLoggedIn =
    context.isLoggedIn && ROUTES.hasOwnProperty(router.pathname);
  useEffect(() => {
    console.log(
      context.isLoggedIn,
      ROUTES.hasOwnProperty(router.pathname),
      router.pathname
    );
    if (!isLoggedIn && router.pathname !== "/_error") {
      router.replace(ROUTES.LOGIN);
    }
  }, [context.isLoggedIn]);

  return isLoggedIn && router.pathname === "/_error" ? children : <Login />;
};
export default ProtectedRoute;
