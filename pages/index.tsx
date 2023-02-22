import Button from "@/components/button";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import ImageComponent from "@/components/image";
import styles from "../styles/Home.module.scss";
import Loader from "@/components/loader";
import Images from "@/public/assets/images";
import { useContext, useEffect, useState } from "react";
import AuthProvider, { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import SkeletonLoader from "@/components/skeletonLoader";

export default function Home() {
  const { loaderSpinner } = Images;

  const context = useContext(AuthContext);

  const { isLoggedIn, handleLogin } = context;
  const router = useRouter();

  console.log(isLoggedIn);

  const handleLogout = () => {
    handleLogin();
    router.push("/login");
  };

  return (
    <div className={styles.components}>
      <Typography variant="body">Welcome</Typography>
      <InputBox
        label="Enter you text here"
        placeholder="Enter your text here.."
      />
      <Button startIcon={loaderSpinner} variant="contained">
        Play
      </Button>
      <Button startIcon={loaderSpinner} variant="outlined">
        Play
      </Button>
      <Button variant="text">Play</Button>
      <Button onClick={handleLogout}>Logout</Button>
      {!isLoggedIn && <Loader />}
      <div className={styles.profileLoader}>
        <SkeletonLoader type="circle" />
        <div className={styles.content}>
          <SkeletonLoader type="textLarge" />
          <SkeletonLoader type="textMedium" />
          <SkeletonLoader type="textSmall" />
        </div>
      </div>
    </div>
  );
}
