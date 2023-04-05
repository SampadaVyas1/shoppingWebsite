import React, { useState } from "react";
import styles from "./tooltip.module.scss";
import { TOOLTIP_POSITION } from "@/common/enums";
import { ITooltipProp } from "./tooltip.types";

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
