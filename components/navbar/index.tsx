import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { useDispatch } from "react-redux";
import styles from "./navbar.module.scss";
import ImageComponent from "../imageComponent";
import Typography from "../typography";
import ProfileCard from "../profileCard";
import Modal from "../modal";
import Button from "../button";
import TransitionWrapper from "../transitionWrapper";

import Images from "@/public/assets/icons";
import { PRIVATE_ROUTES, TEAM_PAGE_ROUTES } from "@/common/routes";
import { INavbarProps, profileData } from "./navbar.types";
import { useAppSelector } from "@/redux/hooks";
import {
  TYPOGRAPHY_VARIANT,
  TOOLTIP_POSITION,
  BUTTON_VARIANT,
  ROLES,
} from "@/common/types/enums";
import { sagaActions } from "@/redux/actions";
import Loader from "../loader";
import { notify } from "@/helpers/toastHelper";
import { TOKEN } from "@/common/constants";
import { getDataFromLocalStorage } from "@/common/utils";

const Navbar = ({ routes }: INavbarProps) => {
  const router = useRouter();
  const [isProfileOpen, toggleProfile] = useState<boolean>(false);
  const [isLogoutModalOpen, toggleLogoutModal] = useState<boolean>(false);

  const {
    firstName,
    lastName,
    userImageUrl,
    email,
    designation,
    mobileNumber,
    role,
  } = useAppSelector((state) => state.login.userDetails);

  const { syncing } = useAppSelector((state) => state.messages);

  const dispatch = useDispatch();

  const onLogout = () => {
    role !== ROLES.ADMIN && !!getDataFromLocalStorage(TOKEN)
      dispatch({
        type: sagaActions.BACKUP_CHATS,
        payload: { logoutUser: true },
      });
    dispatch({ type: sagaActions.LOGOUT_USER });
  };

  const handleProfileClick = () => {
    toggleProfile(!isProfileOpen);
  };

  const closePopup = () => {
    toggleProfile(false);
  };

  const handleLogoutButtonClick = () => {
    toggleLogoutModal(!isLogoutModalOpen);
  };

  const redirectHome = () => {
    router.push(PRIVATE_ROUTES.HOME);
  };
  return (
    <div className={styles.navbar}>
      {syncing && <Loader customStyles={styles.loader} />}
      <div className={styles.navbarLeft}>
        <div className={styles.logo} onClick={redirectHome}>
          <ImageComponent src={Images.coditasIcon} width={32} height={32} />
          <Typography
            variant={TYPOGRAPHY_VARIANT.HEADER_LARGE}
            customStyle={styles.header}
          >
            Candidate Connect
          </Typography>
        </div>
        {!!routes.length &&
          routes?.map((route) => {
            const routeClassName =
              route.path === router.pathname ||
              (router.pathname.includes(TEAM_PAGE_ROUTES.TEAM) &&
                route.path === TEAM_PAGE_ROUTES.TEAM)
                ? `${styles.active} ${styles.route}`
                : styles.route;
            return (
              <Link href={route.path} className={routeClassName} key={route.id}>
                {route.name}
              </Link>
            );
          })}
      </div>
      <div className={styles.navbarRight}>
        <ImageComponent
          src={Images.notificationIcon}
          customClass={styles.icons}
        />
        <Popover
          isOpen={true}
          positions={[TOOLTIP_POSITION.BOTTOM, TOOLTIP_POSITION.LEFT]}
          reposition={true}
          onClickOutside={closePopup}
          padding={10}
          content={({ position, childRect, popoverRect }) => (
            <TransitionWrapper open={isProfileOpen}>
              <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor="white"
                arrowSize={12}
                arrowStyle={{ opacity: 1, zIndex: 2, top: "0.25rem" }}
                className={styles["popover-arrow-container"]}
                arrowClassName="popover-arrow"
              >
                <ProfileCard
                  profileImage={userImageUrl}
                  firstName={firstName}
                  lastName={lastName}
                  designation={designation}
                  cardBody={
                    <React.Fragment>
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                        customStyle={styles.email}
                      >
                        Email : <span className={styles.boldText}>{email}</span>
                      </Typography>
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                        customStyle={styles.email}
                      >
                        Phone :
                        <span className={styles.boldText}>{mobileNumber}</span>
                      </Typography>
                    </React.Fragment>
                  }
                  cardFooter={
                    <Button
                      variant={BUTTON_VARIANT.OUTLINED}
                      startIcon={Images.logoutIcon}
                      customStyle={styles.logoutButton}
                      onClick={handleLogoutButtonClick}
                    >
                      Log Out
                    </Button>
                  }
                />
              </ArrowContainer>
            </TransitionWrapper>
          )}
        >
          <div onClick={handleProfileClick}>
            <ImageComponent
              src={Images.profileIcon}
              customClass={styles.icons}
            />
          </div>
        </Popover>
      </div>

      <Modal
        open={isLogoutModalOpen}
        header="Log Out"
        onClose={handleLogoutButtonClick}
        customStyle={styles.logoutModal}
      >
        <div className={styles.logout}>
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
            customStyle={styles.text}
          >
            Are you sure you want to Log Out from the application?
          </Typography>
          <div className={styles.buttons}>
            <Button
              variant={BUTTON_VARIANT.OUTLINED}
              onClick={handleLogoutButtonClick}
            >
              Cancel
            </Button>
            <Button variant={BUTTON_VARIANT.CONTAINED} onClick={onLogout}>
              {syncing ? "Logging out...." : "Log Out"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Navbar;
