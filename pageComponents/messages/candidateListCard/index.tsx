import { MESSAGE_STATUS, TYPOGRAPHY_VARIANT } from "@/common/types/enums";
import ImageComponent from "@/components/imageComponent";
import Typography from "@/components/typography";
import Images from "@/public/assets/icons";
import styles from "./candidateListCard.module.scss";
import { ICandidateListCardProps } from "./candidateListCard.types";
import { getStatusImage } from "@/common/utils";

const CandidateListCard = (props: ICandidateListCardProps) => {
  const {
    status = MESSAGE_STATUS.RECEIVED,
    time,
    profilePhoto,
    name,
    message,
    unreadCount,
    isSelected,
  } = props;

  const statusImage = getStatusImage(status!);
  return (
    <div
      className={
        !isSelected
          ? styles.candidateCard
          : `${styles.candidateCard} ${styles.selected}`
      }
      onClick={props.onClick}
    >
      <ImageComponent
        src={profilePhoto}
        fallbackText={name.charAt(0)}
        customClass={styles.profile}
        fallbackClass={styles.profile}
      />
      <div className={styles.candidateDetail}>
        <div className={styles.nameTime}>
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}
            customStyle={styles.name}
          >
            {name}
          </Typography>
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
            customStyle={styles.time}
          >
            {time}
          </Typography>
        </div>
        <div className={styles.message}>
          {status !== MESSAGE_STATUS.RECEIVED && (
            <ImageComponent src={statusImage} customClass={styles.status} />
          )}
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
            customStyle={
              status !== MESSAGE_STATUS.RECEIVED
                ? styles.messageText
                : `${styles.messageText} ${styles.unread}`
            }
          >
            {message || "Start conversation"}
          </Typography>
          {!!unreadCount && <div className={styles.badge}>{unreadCount}</div>}
        </div>
      </div>
    </div>
  );
};
export default CandidateListCard;
