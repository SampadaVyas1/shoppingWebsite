import { use, useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useLiveQuery } from "dexie-react-hooks";
import { IMessage, db } from "@/db";
import CandidateListCard from "../candidateListCard";
import SkeletonLoader from "@/components/skeletonLoader";
import InfiniteScroll from "@/components/infiniteScroll";
import styles from "./candidateList.module.scss";
import { SKELETON_VARIANT } from "@/common/types/enums";
import { sortMessages } from "@/common/utils/dbUtils";
import { ICandidateListCardProps } from "../candidateListCard/candidateListCard.types";
import { ICandidateListProps } from "./candidateList.types";
import { TIME_FORMAT } from "@/common/constants";
import { ISentMessage } from "@/common/types";

const CandidateList = (props: ICandidateListProps) => {
  const { isLoading, selectedData, candidateData, onSelect } = props;

  const [candidateList, setCandidateList] = useState<ICandidateListCardProps[]>(
    []
  );
  const conversations = useLiveQuery(() => {
    return db.conversations.toArray();
  });

  const messageListData = useLiveQuery(() => {
    return db.messages.toArray();
  });

  const onPageChange = () => {
    setCandidateList(candidateList.concat(candidateData));
  };

  const handleCandidateSelect = useCallback(
    (candidate: ICandidateListCardProps) => () => onSelect(candidate),
    [onSelect]
  );

  useEffect(() => {
    setCandidateList(candidateData);
  }, [candidateData]);

  return isLoading ? (
    <div className={styles.listSkeleton}>
      {[...Array(10).keys()].map((element: number, index: number) => {
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
    <InfiniteScroll
      handlePageChange={onPageChange}
      nextPage={candidateList?.length < candidateData?.length}
      customClass={styles.chatInfinite}
    >
      <div className={styles.list}>
        {candidateList?.map(
          (candidate: ICandidateListCardProps, index: number) => {
            const { name, mobile, id, profilePhoto } = candidate;
            const currentCandidateData = conversations?.find(
              (data: IMessage) => data.id === id
            );
            const currentMessages = messageListData?.filter(
              (message: ISentMessage) => message.phone === id
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
                        .format(TIME_FORMAT.HOUR_MINUTE)
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
    </InfiniteScroll>
  );
};
export default CandidateList;
