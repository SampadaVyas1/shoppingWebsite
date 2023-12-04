import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/app.module.scss";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import { useAppSelector } from "@/redux/hooks";
import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";
import Switch from "@/components/switch";
import { Auth0Provider } from "@auth0/auth0-react";
import Example from "@/components/binaryGraph";
import ModalBox from "@/components/modalBox";

const Home = () => {
  return (
    <Auth0Provider
      domain="dev-wy8yfp8mxocgn1yc.us.auth0.com"
      clientId="ArxEK3QobsIcOKzyjBBRiLL1PC4btvDc"
      authorizationParams={{
        redirect_uri: "/",
      }}
    >
      <div className={styles.components}>
        <Typography variant={TYPOGRAPHY_VARIANT.HEADER_MEDIUM_SEMIBOLD}>
          Welcome!!
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Example width={1000} height={400} />
        </div>
      </div>
    </Auth0Provider>
  );
};
export default Home;
