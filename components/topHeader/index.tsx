import React, { useContext } from "react";
import classes from "./topHeader.module.scss";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { FiSun } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ThemeContext } from "@/pages/_app";
import { FaMoon } from "react-icons/fa";

const TopHeader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);
  const toggleMode = () => {
    toggleTheme();
  };
  const handleOnClick = () => {
    window.location.href = "/offers";
  };
  return (
    <div className={classes.topHeaderContainer}>
      <div className={classes.headerContainerRightSide}>
        <button className={classes.latestCloth} onClick={() => handleOnClick()}>
          Hot
        </button>
        <div className={classes.freeShipping}>Free Express Shipping</div>
      </div>
      <div className={classes.headerContainerLeftSide}>
        {theme === "light" ? (
          <FaMoon className={classes.icons} onClick={toggleMode} />
        ) : (
          <FiSun className={classes.icons} onClick={toggleMode} />
        )}
        <div className={classes.icons}>
          EN <RiArrowDropDownLine />
        </div>
        <div className={classes.socialMediaIcon}>
          <FaInstagram className={classes.icons} />
          <FaTwitter className={classes.icons} />
          <ImFacebook2 className={classes.icons} />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
