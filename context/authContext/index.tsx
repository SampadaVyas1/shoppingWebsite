import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

interface IAuthContextProps {
  children: any;
}

export interface IAuthContextDefault {
  loginData: any;
  isLoggedIn: boolean;
  handleLogin: () => any;
  getUserInfo: () => any;
  handleLogout: () => any;
}

interface IAuthStates {
  loginData: any;
  isLoggedIn: boolean;
}

const defaultValues = {
  loginData: {},
  isLoggedIn: false,
  handleLogin: () => {},
  getUserInfo: () => {},
  handleLogout: () => {},
};

const AuthContext = React.createContext<IAuthContextDefault>(defaultValues);

const AuthProvider = (props: IAuthContextProps) => {
  const [authProviderState, setAuthProviderState] = useState<IAuthStates>({
    loginData: {},
    isLoggedIn: false,
  });
  const handleLogin = () => {
    setAuthProviderState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
    }));
    setDataInLocalStorage("token", "kwkdgdkjgk");
  };

  const handleLogout = () => {
    setAuthProviderState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
    }));
    localStorage.clear();
  };

  const getUserInfo = () => {
    //async actions here
  };

  const { children } = props;

  useEffect(() => {
    setAuthProviderState((prevState) => ({
      ...prevState,
      isLoggedIn: !!getDataFromLocalStorage("token"),
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...authProviderState, handleLogin, getUserInfo, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
