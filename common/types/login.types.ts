import { IUserData } from ".";

export interface ILoginStates {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  featureData: any;
  isLoginError: boolean;
  userDetails: IUserData;
  errorMessage: string;
}
export interface ITokens {
  accessToken: string;
  refreshToken: string;
  userToken: string;
}
