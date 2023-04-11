import styles from "./skeletonLoader.module.scss";
import { ISkeletonLoaderProps } from "./skeletonLoader.types";

const SkeletonLoader = (props: ISkeletonLoaderProps) => {
  const { type, customClass } = props;
  return (
    <div className={`${styles.skeleton} ${customClass} ${styles[type]}`}>
      <div className={styles.shimmer}></div>
    </div>
  );
};
export default SkeletonLoader;
