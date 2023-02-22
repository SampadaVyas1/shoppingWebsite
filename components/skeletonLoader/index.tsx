import styles from "./index.module.scss";

interface ISkeletonLoaderProps {
  type: "circle" | "textLarge" | "textMedium" | "textSmall";
  customClass?: string;
}

const SkeletonLoader = (props: ISkeletonLoaderProps) => {
  const { type, customClass } = props;
  return (
    <div className={`${styles.skeleton} ${customClass} ${styles[type]}`}>
      <div className={styles.shimmer}></div>
    </div>
  );
};
export default SkeletonLoader;
