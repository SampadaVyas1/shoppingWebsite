import service from "./config";

export const getLoginData = async (codeResponse?: any) => {
  try {
    const res = await service.post("/auth/login", {
      authorizationCode: codeResponse,
    });
    console.log(res);
    return res;
  } catch (Error) {
    console.log(Error);
  }
};
