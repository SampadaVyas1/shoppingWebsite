import React, { useState, useEffect } from "react";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import { REFRESH_TOKEN, TOKEN, USER_TOKEN } from "@/common/constants";
import { googleLogout } from "@react-oauth/google";

interface IAuthContextProps {
  children: any;
}

export interface IAuthContextDefault {
  loginData: any;
  isLoggedIn: boolean;
  handleLogin: (
    accessToken: string,
    refreshToken: string,
    userToken: string
  ) => void;
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
  const handleLogin = (
    accessToken: string,
    refreshToken: string,
    userToken: string
  ) => {
    setAuthProviderState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
    }));
    setDataInLocalStorage(TOKEN, accessToken);
    setDataInLocalStorage(REFRESH_TOKEN, refreshToken);
    setDataInLocalStorage(USER_TOKEN, userToken);
  };

  const handleLogout = () => {
    setAuthProviderState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
    }));
    localStorage.clear();
    googleLogout();
  };

  const getUserInfo = () => {
    //async actions here
  };

  const { children } = props;

  useEffect(() => {
    setAuthProviderState((prevState) => ({
      ...prevState,
      isLoggedIn: !!getDataFromLocalStorage(TOKEN),
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
