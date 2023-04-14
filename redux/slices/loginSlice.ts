import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "../constants";

interface ILoginStates {
  isLoggedIn: boolean;
}

const initialState = {
  isLoading: false,
  role: [],
};

export const handleLogin = createAsyncThunk(
  LOGIN,
  async function onLogin(response: any) {
    // const data = await authService(response.credential);
    // if (data?.error?.length > 0) {
    //   return data;
    // } else {
    //   const accessToken = data.data.accessToken;
    //   storeDataInSession("access-token", encode(accessToken));
    //   return data;
    // }
    // setAuthProviderState((prevState) => ({
    //     ...prevState,
    //     isLoggedIn: true,
    //   }));
    //   setDataInLocalStorage(TOKEN, accessToken);
    //   setDataInLocalStorage(REFRESH_TOKEN, refreshToken);
    //   setDataInLocalStorage(USER_TOKEN, userToken);
  }
);

export const loginSlice = createSlice({
  name: LOGIN,
  initialState,
  reducers: {
    toggleLoader: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        role: payload?.data?.roles,
      };
    });
    builder.addCase(handleLogin.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
  },
});
export default loginSlice.reducer;
