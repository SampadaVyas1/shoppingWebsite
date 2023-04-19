import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/styles/globals.scss";
import Splash from "@/components/splash";
import ProtectedRoute from "@/hoc/protectedRoute";
import { PRIVATE_ROUTES } from "@/common/routes";
import { useState, useEffect } from "react";
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
    if (!navigator.onLine) {
      setIsOnline(false);
      notify(true, "  nO INternet", 12);
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}>
      <Provider store={store}>
        {router.pathname === PRIVATE_ROUTES.LOGIN ? (
          <LoginElement />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Provider>
    </GoogleOAuthProvider>
  );
}
