import React, { useState } from "react";
import { storeDataInLocalStorage, encode } from "../../helpers/utils";

interface IAuthContextProps {
  children: any;
}

export interface IAuthContextDefault {
  loginData: any;
  isLoggedIn: boolean;
  handleLogin: () => any;
  getUserInfo: () => any;
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
      isLoggedIn: !authProviderState.isLoggedIn,
    }));
  };

  const getUserInfo = () => {
    //async actions here
  };

  const { children } = props;
  return (
    <AuthContext.Provider
      value={{ ...authProviderState, handleLogin, getUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
