import { use, useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useLiveQuery } from "dexie-react-hooks";
import { IMessage, db } from "@/db";
import CandidateListCard from "../candidateListCard";
import SkeletonLoader from "@/components/skeletonLoader";
import InfiniteScroll from "@/components/infiniteScroll";
import styles from "./candidateList.module.scss";
import { SKELETON_VARIANT } from "@/common/types/enums";
import {
  getAllConversations,
  getAllMessages,
  sortMessages,
} from "@/common/utils/dbUtils";
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
    return getAllConversations();
  });

  const messageListData = useLiveQuery(() => {
    return getAllMessages();
  });

  const renderSkeleton = (
    variant: SKELETON_VARIANT,
    className: string = ""
  ) => <SkeletonLoader type={variant} customClass={className} />;

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
            {renderSkeleton(SKELETON_VARIANT.CIRCLE)}
            <div className={styles.contentSkeleton}>
              {renderSkeleton(SKELETON_VARIANT.TEXT_LARGE, styles.skeletonBox)}
              {renderSkeleton(SKELETON_VARIANT.TEXT_MEDIUM, styles.skeletonBox)}
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
            const { id } = candidate;
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
