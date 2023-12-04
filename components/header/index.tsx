import React, { useState } from "react";
import classes from "./header.module.scss";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { productSearch } from "@/reduxSaga/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoPerson } from "react-icons/io5";
import List from "../list";
import { personalDetails } from "./personalData";
const Header = () => {
  const result = useSelector((state: any) => state.cartData);
  const router = useRouter();
  const dispatch = useDispatch();
  const [onHoverPersonProfile, setOnHoverPersonProfile] = useState(false);

  const profileLogin = () => {
    return (
      <>
        <button className={classes.loginButton}>SignIn/LogIn</button>
      </>
    );
  };

  const handleRouteChange = (route: any) => {
    router.push(route);
  };
  return (
    <div className={classes.headerSection}>
      <div
        className={`${classes.heading} ${classes.cartContainer}`}
        onClick={() => handleRouteChange("/cart")}
      >
        <FaCartArrowDown className={classes.cartImage} />
        <span
          onClick={() => handleRouteChange("/eComPage")}
          className={classes.websiteName}
        >
          Ecom-Website
        </span>
        <div className={classes.count}>{result.length}</div>
      </div>
      <div className={classes.searchBoxWrapper}>
        <CiSearch className={classes.searchIcon} />
        <input
          type="text"
          className={`${classes.searchProduct} searchProduct`}
          onChange={(event: any) => dispatch(productSearch(event.target.value))}
          placeholder="Search your product"
        />
        <div className={classes.allCategories}>
          All categories
          <RiArrowDropDownLine className={classes.dropDownIcon} />
        </div>
      </div>

      <div className={classes.profileDetails}>
        <IoPerson
          className={classes.personIcon}
          onMouseEnter={() => setOnHoverPersonProfile(true)}
          onMouseLeave={() => setOnHoverPersonProfile(false)}
        />
        {
          <List
            renderComponent={profileLogin}
            customStyle={classes.customListStyle}
            listData={personalDetails}
            isShown={onHoverPersonProfile}
            setIsShown={setOnHoverPersonProfile}
          />
        }
      </div>
    </div>
  );
};

export default Header;
