import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import styles from "./login.module.scss";
import Button from "@/components/button";
import ImageComponent from "@/components/image";
import Loader from "@/components/loader";
import Typography from "@/components/typography";
import Container from "@/components/container";
import Images from "@/public/assets/icons";
import { sagaActions } from "@/redux/constants";
import { useAppSelector } from "@/redux/hooks";
import { ADMIN_EMAIL, TOKEN } from "@/common/constants";
import { PRIVATE_ROUTES, RECRUITER_ROUTES } from "@/common/routes";
import { getDataFromLocalStorage } from "@/common/utils";
import SectionImage from "../../public/assets/images/loginImage.svg";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/types/enums";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, isLoading, isLoginError } = useAppSelector(
    (state) => state.login
  );

  const handleContactAdmin = () => {
    const win: Window = window;
    win.location = `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`;
  };

  const handleClick = async (codeResponse: Object) => {
    dispatch({
      type: sagaActions.GET_LOGIN_DATA,
      token: codeResponse,
    });
  };
  function onSuccess(codeResponse: Object) {
    handleClick(codeResponse);
  }
  const login = useGoogleLogin({ onSuccess: onSuccess, flow: "auth-code" });

  useEffect(() => {
    if (
      !!getDataFromLocalStorage(TOKEN) &&
      (router.pathname !== PRIVATE_ROUTES.HOME ||
        router.pathname !== PRIVATE_ROUTES.NOT_FOUND_ROUTE)
    ) {
      router.back();
    }
  }, [router]);

  useEffect(() => {
    isLoggedIn && router.replace(RECRUITER_ROUTES[1].path);
  }, [isLoggedIn, router]);

  return (
    <>
      {isLoggedIn || isLoading ? (
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

            {isLoginError && (
              <Typography
                customStyle={styles.loginError}
                variant={TYPOGRAPHY_VARIANT.ERROR}
              >
                <ImageComponent src={Images.warning} />
                {`You don't have permissions to login`}
              </Typography>
            )}

            <Typography
              variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
              customStyle={styles.text}
            >
              Having trouble logging in?
              <span onClick={handleContactAdmin}> Contact Admin</span>
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
