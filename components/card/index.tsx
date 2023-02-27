import styles from "./index.module.scss";

interface ICardProps {
  title?: string;
  children: JSX.Element;
  customClass?: string;
}

const Card = (props: ICardProps) => {
  return (
    <div className={` ${props.customClass} ${styles.cardWrapper}`}>
      {props.title && <div className={styles.title}>{props.title}</div>}
      {props.children}
    </div>
  );
};
export default Card;
