import Images from "@/public/assets/icons";
import styles from "./candidateList.module.scss";
import { skeletonArray } from "../chatBody/chatBody.constants";
import SkeletonLoader from "@/components/skeletonLoader";
import { MESSAGE_STATUS, SKELETON_VARIANT } from "@/common/enums";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import { getMessages, sortMessages } from "@/common/dbUtils";
import moment from "moment";
import { ICandidateListCardProps } from "../candidateListCard/candidateListCard.types";
import CandidateListCard from "../candidateListCard";
const CandidateList = (props: any) => {
  const conversations = useLiveQuery(() => {
    return db.conversations.toArray();
  });

  const messageListData = useLiveQuery(() => {
    return db.messages.toArray();
  });
  return props.isLoading ? (
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
      {props.candidateData.map(
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
              status={
                lastMessage?.status
                  ? lastMessage.status
                  : MESSAGE_STATUS.RECEIVED
              }
              onClick={() => props.onSelect(candidate)}
              isSelected={props?.selectedData?.id === candidate?.id}
              time={
                lastMessage?.timestamp
                  ? moment
                      .unix(parseInt(lastMessage?.timestamp))
                      .format("hh:mm A")
                  : ""
              }
              profilePhoto={candidate.profilePhoto}
              message={lastMessage?.message}
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
