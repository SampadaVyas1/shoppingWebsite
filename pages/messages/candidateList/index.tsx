import Images from "@/public/assets/icons";
import CandidateListCard, {
  ICandidateListCardProps,
} from "../candidateListCard";
import styles from "./candidateList.module.scss";
import { skeletonArray } from "../chatBody/chatBody.constants";
import SkeletonLoader from "@/components/skeletonLoader";
import { SKELETON_VARIANT } from "@/common/enums";
const CandidateList = (props: any) => {
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
        (candidate: ICandidateListCardProps, index: number) => (
          <CandidateListCard
            key={index}
            name={candidate.name}
            status={candidate.status}
            onClick={() => props.onSelect(candidate)}
            isSelected={props?.selectedData?.id === candidate?.id}
            time={candidate.time}
            profilePhoto={candidate.profilePhoto}
            message={candidate.message}
            unreadCount={candidate.unreadCount}
          />
        )
      )}
    </div>
  );
};
export default CandidateList;
