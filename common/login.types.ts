export interface ILoginStates {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  featureData: any;
}
export interface ITokens {
  accessToken: string;
  refresh_token: string;
  userToken: string;
}
