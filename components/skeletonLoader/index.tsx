import styles from "./skeletonLoader.module.scss";
import { SKELETON_VARIANT } from "@/common/enums";

interface ISkeletonLoaderProps {
  type:
    | SKELETON_VARIANT.CIRCLE
    | SKELETON_VARIANT.TEXT_LARGE
    | SKELETON_VARIANT.TEXT_MEDIUM
    | SKELETON_VARIANT.TEXT_SMALL;
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
