import React, { useState } from "react";
import styles from "./tooltip.module.scss";
import { TOOLTIP_POSITION } from "@/common/enums";

interface ITooltipProp {
  children: JSX.Element;
  delay?: number;
  position:
    | TOOLTIP_POSITION.TOP
    | TOOLTIP_POSITION.BOTTOM
    | TOOLTIP_POSITION.LEFT
    | TOOLTIP_POSITION.RIGHT;
  content: JSX.Element;
  customStyle?: string;
}

const Tooltip = (props: ITooltipProp) => {
  const {
    children,
    delay,
    position = TOOLTIP_POSITION.BOTTOM,
    content,
    customStyle,
  } = props;
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div
          className={`${styles.tooltipTip} ${styles[position]} ${customStyle}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
