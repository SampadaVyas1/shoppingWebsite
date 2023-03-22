import { TOOLTIP_POSITION } from "@/common/enums";
import styles from "./tipContainer.module.scss";

interface ITipContainerProps {
  children: JSX.Element;
  position?: TOOLTIP_POSITION.LEFT | TOOLTIP_POSITION.RIGHT;
  customStyles?: string;
  variant?: "sent" | "received";
}

const TipContainer = (props: ITipContainerProps) => {
  const {
    children,
    position = TOOLTIP_POSITION.RIGHT,
    customStyles,
    variant = "sent",
  } = props;
  return (
    <div className={`${styles.tipContainer}`}>
      <div
        className={`${styles[position]} ${customStyles} ${styles[variant]}`}
      ></div>
      {children}
    </div>
  );
};
export default TipContainer;
