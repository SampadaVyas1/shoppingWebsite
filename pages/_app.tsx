import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "@/styles/globals.scss";
import Splash from "@/components/splash";
import AuthProvider from "@/context/authContext";
import ProtectedRoute from "@/hoc/protectedRoute";
import { PRIVATE_ROUTES } from "@/common/routes";

const LoginElement = dynamic(() => import("./login"), {
  loading: () => <Splash />,
  ssr: false,
  suspense: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthProvider>
      {router.pathname === PRIVATE_ROUTES.LOGIN ? (
        <LoginElement />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}
