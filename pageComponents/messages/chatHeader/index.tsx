import React, { useState } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import Typography from "@/components/typography";
import SkeletonLoader from "@/components/skeletonLoader";
import styles from "./chatHeader.module.scss";
import { IChatHeaderProps } from "./chatHeader.types";
import {
  ARROW_ALIGNMENT,
  ROLES,
  SKELETON_VARIANT,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/types/enums";
import TransitionWrapper from "@/components/transitionWrapper";
import ProfileCard from "@/components/profileCard";
import { useAppSelector } from "@/redux/hooks";

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
  const { role } = useAppSelector((state) => state.login.userDetails);

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

  const renderSkeleton = (className: string, variant: SKELETON_VARIANT) => (
    <SkeletonLoader type={variant} customClass={className} />
  );

  const handleDetails = () => {
    toggleDetails(!showDetails);
  };

  const closeDetails = () => {
    showDetails && toggleDetails(false);
  };

  return !isLoading ? (
    <div className={styles.chatHeader}>
      <div className={styles.profile}>
        <Popover
          isOpen={true}
          positions={[TOOLTIP_POSITION.BOTTOM, TOOLTIP_POSITION.RIGHT]}
          reposition={true}
          align={ARROW_ALIGNMENT.START}
          onClickOutside={closeDetails}
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
                      {role === ROLES.ADMIN &&
                        renderTypography(
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
                            {interviewStatus || " N/A"}
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
        {renderSkeleton(styles.image, SKELETON_VARIANT.CIRCLE)}
        <div className={styles.detailSkeleton}>
          {renderSkeleton(styles.skeletonText, SKELETON_VARIANT.TEXT_SMALL)}
          {renderSkeleton(styles.skeletonText, SKELETON_VARIANT.TEXT_MEDIUM)}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
