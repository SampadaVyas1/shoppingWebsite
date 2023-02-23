import Button from "@/components/button";
import AuthProvider, { AuthContext } from "@/context/authContext";
import ProtectedRoute from "@/hoc/protectedRoute";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useContext } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </AuthProvider>
  );
}
