import { useState, useRef } from "react";
import styles from "./hoverCard.module.scss";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { TOOLTIP_POSITION } from "@/common/types/enums";
import { CSSTransition } from "react-transition-group";
import { DEBOUNCE_TIME } from "@/common/constants";
import { IHoverCardProps } from "./hoverCard.types";

const HoverCard = (props: IHoverCardProps) => {
  const {
    children,
    component,
    customStyle,
    customTipStyle,
    containerPosition = [TOOLTIP_POSITION.RIGHT],
    tipPosition = TOOLTIP_POSITION.RIGHT,
  } = props;
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, DEBOUNCE_TIME.DROPDOWN_SEARCH_DEBOUNCE);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <Popover
      isOpen={true}
      positions={containerPosition}
      reposition={true}
      padding={8}
      content={({ position, childRect, popoverRect }) => (
        <CSSTransition
          in={active}
          timeout={DEBOUNCE_TIME.DROPDOWN_SEARCH_DEBOUNCE}
          classNames="alert"
          unmountOnExit
        >
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor="white"
            arrowSize={14}
            arrowStyle={{
              opacity: 1,
              zIndex: 2,
              left: position === TOOLTIP_POSITION.RIGHT ? "0.25rem" : "auto",
            }}
            className="popover-arrow-container"
            arrowClassName="popover-arrow"
          >
            <div className={`${styles.hoverContainer} ${customStyle}`}>
              {component}
            </div>
          </ArrowContainer>
        </CSSTransition>
      )}
    >
      <div
        className={styles.hoverCardWrapper}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
      >
        {children}
      </div>
    </Popover>
  );
};
export default HoverCard;
