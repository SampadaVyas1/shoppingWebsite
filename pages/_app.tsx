import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "@/reduxSaga/store/store";
import EcomPage from "./eComPage";
import { useRouter } from "next/router";
import { Auth0Provider } from "@auth0/auth0-react";
import { createContext, useState } from "react";
// import { createContext } from "vm";

export const ThemeContext = createContext<any>(null);
export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    </ThemeContext.Provider>
  );
}
