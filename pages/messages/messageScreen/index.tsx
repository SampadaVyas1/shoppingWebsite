import ChatBottom from "../chatBottom";
import ChatHeader from "../chatHeader";
import styles from "./messageScreen.module.scss";

const MessageScreen = (props: any) => {
  const { name, designation, techStack, interviewStatus, profileImage } =
    props.candidateData;
  return (
    <div className={styles.messageScreen}>
      <ChatHeader
        name={name}
        designation={designation}
        techStack={techStack}
        interviewStatus={interviewStatus}
        profileImage={profileImage}
      />
      <div className={styles.messageBody}></div>
      <ChatBottom />
    </div>
  );
};
export default MessageScreen;
