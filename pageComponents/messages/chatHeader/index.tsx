import React, { useState } from "react";
import ImageComponent from "@/components/imageComponent";
import Typography from "@/components/typography";
import SkeletonLoader from "@/components/skeletonLoader";
import styles from "./chatHeader.module.scss";
import { IChatHeaderProps } from "./chatHeader.types";
import {
  ARROW_ALIGNMENT,
  BUTTON_VARIANT,
  SKELETON_VARIANT,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/types/enums";
import TransitionWrapper from "@/components/transitionWrapper";
import { ArrowContainer, Popover } from "react-tiny-popover";
import MessageFilter from "../messageFilter";
import ProfileCard from "@/components/profileCard";
import Images from "@/build/assets/icons";
import Button from "@/components/button";
import Image from "next/image";

const ChatHeader = (props: IChatHeaderProps) => {
  const {
    isLoading,
    name,
    designation,
    techStack,
    interviewStatus,
    profileImage,
    recruiter,
    phone,
  } = props;

  const [showDetails, toggleDetails] = useState<boolean>(false);

  const renderTypography = (
    text: string | JSX.Element,
    variant: TYPOGRAPHY_VARIANT,
    customStyle?: string
  ) => {
    return (
      <Typography variant={variant} customStyle={customStyle}>
        {text}
      </Typography>
    );
  };

  const handleDetails = () => {
    toggleDetails(!showDetails);
  };

  return !isLoading ? (
    <div className={styles.chatHeader}>
      <div className={styles.profile}>
        <Popover
          isOpen={true}
          positions={[TOOLTIP_POSITION.BOTTOM, TOOLTIP_POSITION.RIGHT]}
          reposition={true}
          align={ARROW_ALIGNMENT.START}
          // onClickOutside={handleDetails}
          padding={16}
          content={({ position, childRect, popoverRect }) => (
            <TransitionWrapper open={showDetails}>
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
                  profileImage={profileImage}
                  firstName={name}
                  lastName=""
                  designation={designation}
                  cardBody={
                    <React.Fragment>
                      {renderTypography(
                        <>
                          Tech Stack :
                          <span className={styles.boldText}>{techStack}</span>
                        </>,
                        TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR,
                        styles.email
                      )}
                      {renderTypography(
                        <>
                          Recruiter:
                          <span className={styles.boldText}>{recruiter}</span>
                        </>,
                        TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR,
                        styles.email
                      )}
                      {renderTypography(
                        <>
                          Status :
                          <span className={styles.boldText}>
                            {interviewStatus}
                          </span>
                        </>,
                        TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR,
                        styles.email
                      )}
                      {renderTypography(
                        <>
                          Phone :
                          <span className={styles.boldText}>{phone}</span>
                        </>,
                        TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR,
                        styles.email
                      )}
                    </React.Fragment>
                  }
                />
              </ArrowContainer>
            </TransitionWrapper>
          )}
        >
          <div className={styles.profileImage} onClick={handleDetails}>
            {name?.charAt(0).toUpperCase()}
          </div>
        </Popover>
        <div className={styles.detail}>
          {renderTypography(name, TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD)}
          {renderTypography(
            designation,
            TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR,
            styles.hint
          )}
        </div>
      </div>
      <div className={styles.detail}>
        {renderTypography(
          techStack,
          TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR,
          styles.hint
        )}
        {renderTypography(
          interviewStatus || `Yet to be contacted`,
          TYPOGRAPHY_VARIANT.TEXT_SMALL_SEMIBOLD,
          styles.status
        )}
      </div>
    </div>
  ) : (
    <div className={styles.chatHeader}>
      <div className={styles.profile}>
        <SkeletonLoader
          type={SKELETON_VARIANT.CIRCLE}
          customClass={styles.image}
        />
        <div className={styles.detailSkeleton}>
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.skeletonText}
          />
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_MEDIUM}
            customClass={styles.skeletonText}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
