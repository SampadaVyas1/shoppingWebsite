import styles from "./card.module.scss";

interface ICardProps {
  title?: string;
  children: JSX.Element;
  customClass?: string;
}

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
