import ROUTES from "@/common/routes";
import Splash from "@/components/splash";
import AuthProvider, { AuthContext } from "@/context/authContext";
import ProtectedRoute from "@/hoc/protectedRoute";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const LoginElement = dynamic(() => import("./login"), {
  loading: () => <Splash />,
  ssr: false,
  suspense: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthProvider>
      {router.pathname === ROUTES.LOGIN ? (
        <LoginElement />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}
