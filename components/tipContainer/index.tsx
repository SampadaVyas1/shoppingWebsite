import { TOOLTIP_POSITION } from "@/common/enums";
import styles from "./tipContainer.module.scss";
import { ITipContainerProps } from "./tipContainer.types";
import { MESSAGE_STATUS_VARIANT } from "@/common/socketConstants";

const TipContainer = (props: ITipContainerProps) => {
  const {
    children,
    position = TOOLTIP_POSITION.RIGHT,
    customStyles,
    variant = MESSAGE_STATUS_VARIANT.SENT,
  } = props;
  return (
    <div className={`${styles.tipContainer} ${styles[variant]}`}>
      <div
        className={`${styles[position]} ${customStyles} ${styles[variant]}`}
      ></div>
      {children}
    </div>
  );
};
export default TipContainer;
