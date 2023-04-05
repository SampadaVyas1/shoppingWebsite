import styles from "./card.module.scss";
import { ICardProps } from "./card.types";

const Card = (props: ICardProps) => {
  const { title = "", children, customClass } = props;
  return (
    <div className={` ${customClass} ${styles.cardWrapper}`}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};
export default Card;
