import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import styles from "./messages.module.scss";
import { TOOLTIP_POSITION } from "@/common/enums";

const TooltipContent = ({ customClass }: any) => {
  return (
    <div className={`${styles.tooltipContent} ${customClass}`}>
      Hi Yuvika, Im a recruiter from Coditas, reaching out to you regarding an
      exciting opportunity with us! We’re a Pune-based digital engineering
      company and a certified Great Place to Work that provides business
      solutions through UX Design and software development. You seem like a
      great fit for the position based on your profile. If you’re looking for a
      job change, Id love to discuss the details and see if they align with your
      career aspirations.
    </div>
  );
};

const Messages = () => {
  return <div className={styles.messages}>Messages</div>;
};
export default Messages;
