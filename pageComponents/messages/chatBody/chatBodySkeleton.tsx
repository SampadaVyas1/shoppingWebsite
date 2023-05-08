import React from "react";
import SkeletonLoader from "@/components/skeletonLoader";
import { SKELETON_VARIANT } from "@/common/enums";
import { skeletonArray } from "./chatBody.constants";
import styles from "./chatBody.module.scss";

const ChatBodySkeleton = () => {
  return (
    <div className={styles.messageBodySkeleton}>
      {skeletonArray.map((element: any, index: number) => (
        <React.Fragment key={index}>
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.sentSkeletonSmall}
          />
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.sentSkeletonMedium}
          />
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.sentSkeleton}
          />

          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.receivedSkeleton}
          />
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles.receivedSkeletonSmall}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
export default ChatBodySkeleton;
