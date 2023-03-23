/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./login.module.scss";
import { AuthContext } from "@/context/authContext";
import Button from "@/components/button";
import ImageComponent from "@/components/image";
import Loader from "@/components/loader";
import Typography from "@/components/typography";
import Images from "@/public/assets/icons";
import { TOKEN } from "@/common/constants";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import { PRIVATE_ROUTES } from "@/common/routes";
import { getDataFromLocalStorage } from "@/common/utils";
import SectionImage from "../../public/assets/images/loginImage.svg";

const Login = () => {
  const context = useContext(AuthContext);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);

  const router = useRouter();

  const handleClick = () => {
    context.handleLogin();
    router.replace(PRIVATE_ROUTES.HOME);
  };

  useEffect(() => {
    setLoggedIn(!!getDataFromLocalStorage(TOKEN));
    if (
      !!getDataFromLocalStorage(TOKEN) &&
      (router.pathname !== PRIVATE_ROUTES.HOME ||
        router.pathname !== PRIVATE_ROUTES[404])
    ) {
      router.back();
    } else if (
      !!getDataFromLocalStorage(TOKEN) &&
      (router.pathname === PRIVATE_ROUTES.HOME ||
        router.pathname === PRIVATE_ROUTES[404])
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
          <div className={styles.section}>
            <div className={styles.appLogo}>
              <ImageComponent src={Images.coditasIcon} width={48} height={48} />
              <Typography
                variant={TYPOGRAPHY_VARIANT.HEADER_LARGE}
                customStyle={styles.appName}
              >
                Candidate Connect
              </Typography>
            </div>
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
              onClick={handleClick}
            >
              Sign in with google
            </Button>
            <Typography
              variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
              customStyle={styles.text}
            >
              Having trouble logging in? <span> Contact Admin</span>
            </Typography>

            <div className={styles.footer}>
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
            </div>
          </div>
          <div className={`${styles.section} ${styles.sectionRight}`}>
            <ImageComponent
              src={SectionImage}
              customClass={styles.sectionImage}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
