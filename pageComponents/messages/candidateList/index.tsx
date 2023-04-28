import { useCallback } from "react";
import moment from "moment";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import CandidateListCard from "../candidateListCard";
import SkeletonLoader from "@/components/skeletonLoader";
import styles from "./candidateList.module.scss";
import { SKELETON_VARIANT } from "@/common/enums";
import { sortMessages } from "@/common/dbUtils";
import { ICandidateListCardProps } from "../candidateListCard/candidateListCard.types";
import { ICandidateListProps } from "./candidateList.types";
import { skeletonArray } from "../chatBody/chatBody.constants";

const CandidateList = (props: ICandidateListProps) => {
  const { isLoading, selectedData, candidateData, onSelect } = props;
  const conversations = useLiveQuery(() => {
    return db.conversations.toArray();
  });

  const messageListData = useLiveQuery(() => {
    return db.messages.toArray();
  });

  const handleCandidateSelect = useCallback(
    (candidate: ICandidateListCardProps) => () => onSelect(candidate),
    [onSelect]
  );

  return isLoading ? (
    <div className={styles.listSkeleton}>
      {skeletonArray.map((element: number, index: number) => {
        return (
          <div className={styles.userSkeleton} key={index}>
            <SkeletonLoader type={SKELETON_VARIANT.CIRCLE} />
            <div className={styles.contentSkeleton}>
              <SkeletonLoader
                type={SKELETON_VARIANT.TEXT_LARGE}
                customClass={styles.skeletonBox}
              />
              <SkeletonLoader
                type={SKELETON_VARIANT.TEXT_MEDIUM}
                customClass={styles.skeletonBox}
              />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className={styles.list}>
      {candidateData?.map(
        (candidate: ICandidateListCardProps, index: number) => {
          const { name, mobile, id, profilePhoto } = candidate;
          const currentCandidateData = conversations?.find(
            (data) => data.id === mobile
          );
          const currentMessages = messageListData?.filter(
            (message) => message.phone === mobile
          );
          const sortedMessages = sortMessages(currentMessages!);
          const lastMessage =
            !!sortedMessages && sortedMessages[sortedMessages.length - 1];

          return (
            <CandidateListCard
              key={index}
              name={candidate.name}
              onClick={handleCandidateSelect(candidate)}
              isSelected={selectedData?.id === candidate?.id}
              time={
                lastMessage?.timestamp
                  ? moment
                      .unix(parseInt(lastMessage?.timestamp))
                      .format("hh:mm A")
                  : ""
              }
              status={lastMessage?.status}
              profilePhoto={candidate.profilePhoto}
              message={
                lastMessage?.message ||
                lastMessage?.caption ||
                (lastMessage?.mediaUrl ? "File" : "")
              }
              mobile={candidate.mobile}
              unreadCount={currentCandidateData?.unreadCount}
            />
          );
        }
      )}
    </div>
  );
};
export default CandidateList;
