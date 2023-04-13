/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "./login.module.scss";
import { AuthContext } from "@/context/authContext";
import Button from "@/components/button";
import ImageComponent from "@/components/image";
import Loader from "@/components/loader";
import Typography from "@/components/typography";
import Images from "@/public/assets/icons";
import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import { PRIVATE_ROUTES } from "@/common/routes";
import { getDataFromLocalStorage } from "@/common/utils";
import SectionImage from "../../public/assets/images/loginImage.svg";
import Container from "@/components/container";
import { getLoginData } from "@/services/login.service";

const Login = () => {
  const context = useContext(AuthContext);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);

  const router = useRouter();

  const handleClick = async (codeResponse: Object) => {
    const response = await getLoginData(codeResponse);
    if (!response?.error) {
      const { accessToken, refreshToken, userToken } = response.data;
      context.handleLogin(accessToken, refreshToken, userToken);
      router.replace(PRIVATE_ROUTES.HOME);
    }
  };
  function onSuccess(codeResponse: Object) {
    handleClick(codeResponse);
  }
  const login = useGoogleLogin({ onSuccess: onSuccess, flow: "auth-code" });

  useEffect(() => {
    setLoggedIn(!!getDataFromLocalStorage(TOKEN));
    if (
      !!getDataFromLocalStorage(TOKEN) &&
      (router.pathname !== PRIVATE_ROUTES.HOME ||
        router.pathname !== PRIVATE_ROUTES.NOT_FOUND_ROUTE)
    ) {
      router.back();
    } else if (
      !!getDataFromLocalStorage(TOKEN) &&
      (router.pathname === PRIVATE_ROUTES.HOME ||
        router.pathname === PRIVATE_ROUTES.NOT_FOUND_ROUTE)
    ) {
      router.replace(PRIVATE_ROUTES.HOME);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Loader />
      ) : (
        <div className={styles.loginPage}>
          <Container customClass={styles.section}>
            <Container customClass={styles.appLogo}>
              <ImageComponent src={Images.coditasIcon} width={48} height={48} />
              <Typography
                variant={TYPOGRAPHY_VARIANT.HEADER_LARGE}
                customStyle={styles.appName}
              >
                Candidate Connect
              </Typography>
            </Container>
            <div className={styles.content}>
              <Typography
                variant={TYPOGRAPHY_VARIANT.HEADER_LARGE}
                customStyle={styles.loginText}
              >
                Welcome to our Whatsapp Platform
              </Typography>
              <Typography
                variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
                customStyle={styles.text}
              >
                Sign in using your Coditas G-suite account
              </Typography>
            </div>
            <Button
              startIcon={Images.googleIcon}
              variant={BUTTON_VARIANT.OUTLINED}
              customStyle={styles.loginButton}
              onClick={login}
            >
              Sign in with google
            </Button>
            <Typography
              variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
              customStyle={styles.text}
            >
              Having trouble logging in? <span> Contact Admin</span>
            </Typography>

            <Container customClass={styles.footer}>
              <Typography
                variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
                customStyle={styles.text}
              >
                © 2023 Coditas. All rights reserved.
              </Typography>
              <Typography
                variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
                customStyle={styles.privacyPolicy}
              >
                Privacy Policy
              </Typography>
            </Container>
          </Container>
          <Container customClass={`${styles.section} ${styles.sectionRight}`}>
            <ImageComponent
              src={SectionImage}
              customClass={styles.sectionImage}
            />
          </Container>
        </div>
      )}
    </>
  );
};
export default Login;
