import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import styles from "./login.module.scss";
import Button from "@/components/button";
import ImageComponent from "@/components/imageComponent";
import Loader from "@/components/loader";
import Typography from "@/components/typography";
import Container from "@/components/container";
import Images from "@/public/assets/icons";
import { sagaActions } from "@/redux/actions";
import { useAppSelector } from "@/redux/hooks";
import { addDataAfterSync } from "@/common/utils/dbUtils";
import { API_ERROR_MESSAGES, TOKEN } from "@/common/constants";
import { RECRUITER_ROUTES } from "@/common/routes";
import SectionImage from "../../public/assets/images/loginImage.svg";
import {
  BUTTON_VARIANT,
  ROLES,
  ROUTES_PATH,
  TYPOGRAPHY_VARIANT,
} from "@/common/types/enums";
import { resetErrorMessage } from "@/redux/slices/loginSlice";
import { getDataFromLocalStorage } from "@/common/utils";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isChatLoading, setChatLoading] = useState<boolean>(false);
  const {
    isLoggedIn,
    isLoading,
    isLoginError,
    errorMessage,
    userDetails,
    featureData,
  } = useAppSelector((state) => state.login);

  const handleErrorClose = () => {
    dispatch(resetErrorMessage());
  };

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

  const getChatData = async () => {
    setChatLoading(true);
    addDataAfterSync();
    setChatLoading(false);
  };

  const onSuccess = (codeResponse: Object) => {
    handleClick(codeResponse);
  };
  const replaceRoute = () => {
    const redirectRoute =
      userDetails.role === ROLES.ADMIN
        ? ROUTES_PATH.TEAM
        : ROUTES_PATH.MESSAGES;
    router.replace(redirectRoute);
  };
  const login = useGoogleLogin({ onSuccess: onSuccess, flow: "auth-code" });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch({ type: sagaActions.GET_USER_DETAILS });
    }
  }, [isLoggedIn, router, userDetails]);

  useEffect(() => {
    if (userDetails.role) {
      replaceRoute();
    }
  }, [userDetails]);

  useEffect(() => {
    if (isLoggedIn && userDetails.role !== ROLES.ADMIN) {
      getChatData();
    }
    isLoggedIn && router.replace(RECRUITER_ROUTES[1].path);
  }, [isLoggedIn]);

  return (
    <>
      {isChatLoading && <p>Fetching chats</p>}
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
              onClick={getDataFromLocalStorage(TOKEN) ? replaceRoute : login}
            >
              Sign in with google
            </Button>

            {isLoginError && (
              <Typography
                customStyle={styles.loginError}
                variant={TYPOGRAPHY_VARIANT.ERROR}
              >
                <ImageComponent src={Images.warning} />
                {errorMessage || API_ERROR_MESSAGES.ACCESS_DENIED_ERROR}
                <ImageComponent
                  src={Images.close}
                  onClick={handleErrorClose}
                  width={16}
                  height={16}
                />
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
