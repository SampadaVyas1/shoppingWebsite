import Images from "@/public/assets/icons";
import CandidateListCard, {
  ICandidateListCardProps,
} from "../candidateListCard";
import styles from "./candidateList.module.scss";
const CandidateList = (props: any) => {
  return (
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
