import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import ImageComponent from "@/components/image";
import Typography from "@/components/typography";
import Images from "@/public/assets/icons";
import styles from "./candidateListCard.module.scss";

export interface ICandidateListCardProps {
  id?: string;
  status: "SENT" | "DELIVERED" | "READ" | "RECEIVED";
  time: string;
  profilePhoto: string;
  name: string;
  message: string;
  unreadCount?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const CandidateListCard = (props: ICandidateListCardProps) => {
  const { status, time, profilePhoto, name, message, unreadCount, isSelected } =
    props;

  const { readIcon, deliveredIcon, sentIcon } = Images;
  const statusImage =
    status === "READ"
      ? readIcon
      : status === "DELIVERED"
      ? deliveredIcon
      : sentIcon;
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
          {status !== "RECEIVED" && (
            <ImageComponent src={statusImage} customClass={styles.status} />
          )}
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
            customStyle={
              status !== "RECEIVED"
                ? styles.messageText
                : `${styles.messageText} ${styles.unread}`
            }
          >
            {message}
          </Typography>
          {!!unreadCount && <div className={styles.badge}>{unreadCount}</div>}
        </div>
      </div>
    </div>
  );
};
export default CandidateListCard;
