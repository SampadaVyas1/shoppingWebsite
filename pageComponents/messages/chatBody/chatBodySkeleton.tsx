import React, { Fragment } from "react";
import SkeletonLoader from "@/components/skeletonLoader";
import { SKELETON_VARIANT } from "@/common/types/enums";
import styles from "./chatBody.module.scss";

const ChatBodySkeleton = () => {
  const customStyles = [
    "sentSkeletonSmall",
    "sentSkeletonMedium",
    "sentSkeleton",
    "receivedSkeleton",
    "receivedSkeletonSmall",
  ];

  const chatSkeleton = () => {
    return (
      <Fragment>
        {customStyles.map((customClass) => (
          <SkeletonLoader
            type={SKELETON_VARIANT.TEXT_SMALL}
            customClass={styles[customClass]}
          />
        ))}
      </Fragment>
    );
  };

  return (
    <div className={styles.messageBodySkeleton}>
      {[...Array(10).keys()].map((element: any, index: number) => {
        return <React.Fragment key={index}>{chatSkeleton()}</React.Fragment>;
      })}
    </div>
  );
};
export default ChatBodySkeleton;
