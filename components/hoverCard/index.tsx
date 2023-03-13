import { useState } from "react";
import styles from "./hoverCard.module.scss";

const HoverCard = (props: any) => {
  const { children, component, customStyle } = props;
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={styles.hoverCardWrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`${styles.hoverContainer} ${customStyle}`}>
          {component}
        </div>
      )}
    </div>
  );
};
export default HoverCard;
