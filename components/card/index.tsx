import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import Typography from "../typography";
import styles from "./card.module.scss";
import { ICardProps } from "./card.types";

const Card = (props: ICardProps) => {
  const { title = "", children, customClass } = props;
  return (
    <div className={` ${customClass} ${styles.cardWrapper}`}>
      {title && (
        <Typography variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}>
          {title}
        </Typography>
      )}
      {children}
    </div>
  );
};
export default Card;
