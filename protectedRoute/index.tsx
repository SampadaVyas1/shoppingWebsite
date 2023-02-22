import { AuthContext } from "@/context/authContext";
import Login from "@/pages/login";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const context = useContext(AuthContext);
  useEffect(() => {
    if (!context.isLoggedIn) {
      router.replace("/login");
    }
  }, []);

  return context.isLoggedIn ? children : <Login />;
};
export default ProtectedRoute;
