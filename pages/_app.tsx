import ROUTES from "@/common/routes";
import Splash from "@/components/splash";
import AuthProvider, { AuthContext } from "@/context/authContext";
import ProtectedRoute from "@/hoc/protectedRoute";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { notify } from "@/helpers/toastHelper";

const LoginElement = dynamic(() => import("./login"), {
  loading: () => <Splash />,
  ssr: false,
  suspense: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  useEffect(() => {
    console.log(navigator.onLine);
    if (!navigator.onLine) {
      setIsOnline(false);
      notify(true, "  nO INternet", 12);
    }
  }, []);
  return (
    <AuthProvider>
      {router.pathname === ROUTES.LOGIN ? (
        <LoginElement />
      ) : (
        <ProtectedRoute>
          {isOnline ? (
            <>
              <Component {...pageProps} />
              <ToastContainer />
            </>
          ) : (
            <div>No Connection</div>
          )}
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}
