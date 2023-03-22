import ImageComponent from "@/components/image";
import InputBox from "@/components/inputBox";
import Images from "@/public/assets/icons";
import styles from "./chatBottom.module.scss";

const ChatBottom = (props: any) => {
  return (
    <div className={styles.chatBottom}>
      <ImageComponent src={Images.templateIcon} customClass={styles.icon} />
      <ImageComponent src={Images.attachmentIcon} customClass={styles.icon} />
      <InputBox
        multiline
        placeholder="Enter message"
        customClass={styles.input}
      />
      <ImageComponent src={Images.sendIcon} customClass={styles.icon} />
    </div>
  );
};
export default ChatBottom;
