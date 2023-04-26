import ImageComponent from "@/components/imageComponent";
import Typography from "@/components/typography";
import SkeletonLoader from "@/components/skeletonLoader";
import styles from "./chatHeader.module.scss";
import { IChatHeaderProps } from "./chatHeader.types";
import { SKELETON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";

const ChatHeader = (props: IChatHeaderProps) => {
  const {
    isLoading,
    name,
    designation,
    techStack,
    interviewStatus,
    profileImage,
  } = props;
  return !isLoading ? (
    <div className={styles.chatHeader}>
      <div className={styles.profile}>
        <ImageComponent
          src={profileImage}
          fallbackClass={styles.image}
          customClass={styles.image}
          fallbackText={name?.charAt(0)}
        />
        <div className={styles.detail}>
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}>
            {name}
          </Typography>
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
            customStyle={styles.hint}
          >
            {designation}
          </Typography>
        </div>
      </div>
      <div className={styles.detail}>
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
          customStyle={styles.hint}
        >
          {techStack}
        </Typography>
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_SEMIBOLD}
          customStyle={styles.status}
        >
          {interviewStatus}
        </Typography>
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
