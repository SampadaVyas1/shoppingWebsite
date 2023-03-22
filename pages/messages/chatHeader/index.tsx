import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import ImageComponent from "@/components/image";
import Typography from "@/components/typography";
import styles from "./chatHeader.module.scss";

interface IChatHeaderProps {
  name: string;
  profileImage: string;
  designation: string;
  techStack: string;
  interviewStatus: string;
}

const ChatHeader = (props: IChatHeaderProps) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.profile}>
        <ImageComponent
          src={props?.profileImage}
          fallbackClass={styles.image}
          customClass={styles.image}
          fallbackText={props?.name?.charAt(0)}
        />
        <div className={styles.detail}>
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}>
            {props.name}
          </Typography>
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
            customStyle={styles.hint}
          >
            {props.designation}
          </Typography>
        </div>
      </div>
      <div className={styles.detail}>
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
          customStyle={styles.hint}
        >
          {props.techStack}
        </Typography>
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_SEMIBOLD}
          customStyle={styles.status}
        >
          {props.interviewStatus}
        </Typography>
      </div>
    </div>
  );
};

export default ChatHeader;
