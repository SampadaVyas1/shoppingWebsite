import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { ArrowContainer, Popover } from "react-tiny-popover";
import styles from "./navbar.module.scss";
import ImageComponent from "../image";
import Typography from "../typography";
import { IRouteType } from "@/common/types";
import ProfileCard from "../profileCard";
import Modal from "../modal";
import Button from "../button";
import { AuthContext } from "@/context/authContext";
import {
  BUTTON_VARIANT,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/enums";
import Images from "@/public/assets/icons";
import { PRIVATE_ROUTES } from "@/common/routes";
import React from "react";

interface INavbarProps {
  routes: IRouteType[];
}

const Navbar = ({ routes }: INavbarProps) => {
  const router = useRouter();
  const context = useContext(AuthContext);
  const [isProfileOpen, toggleProfile] = useState<boolean>(false);
  const [isLogoutModalOpen, toggleLogoutModal] = useState<boolean>(false);

  const { handleLogout } = context;

  const onLogout = () => {
    handleLogout();
    router.replace(PRIVATE_ROUTES.LOGIN);
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
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div className={styles.logo}>
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
              route.path === router.pathname
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
            <CSSTransition
              in={isProfileOpen}
              timeout={300}
              classNames="alert"
              unmountOnExit
            >
              <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor="white"
                arrowSize={12}
                arrowStyle={{ opacity: 1, zIndex: 2, top: "0.25rem" }}
                className="popover-arrow-container"
                arrowClassName="popover-arrow"
              >
                <ProfileCard
                  profileImage=""
                  name="Kiran Mehta"
                  designation="Associate Talent Acquisition"
                  cardBody={
                    <React.Fragment>
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                        customStyle={styles.email}
                      >
                        Email : <span>{`kiran.mehta@coditas.com`}</span>
                      </Typography>
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                        customStyle={styles.email}
                      >
                        Phone : <span>{`(91) 9898775555`}</span>
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
            </CSSTransition>
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
              Log Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Navbar;
