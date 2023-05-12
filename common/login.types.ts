import { IUserData } from "./types";

export interface ILoginStates {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  featureData: any;
  isLoginError: boolean;
  userDetails: IUserData;
}
export interface ITokens {
  accessToken: string;
  refresh_token: string;
  userToken: string;
}
