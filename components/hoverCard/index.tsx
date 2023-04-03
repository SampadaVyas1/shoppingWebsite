import Images from "@/public/assets/icons";
import { useState, useRef } from "react";
import ImageComponent from "../image";
import styles from "./hoverCard.module.scss";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { TOOLTIP_POSITION } from "@/common/enums";
import { CSSTransition } from "react-transition-group";

type IPositions =
  | TOOLTIP_POSITION.BOTTOM
  | TOOLTIP_POSITION.LEFT
  | TOOLTIP_POSITION.TOP
  | TOOLTIP_POSITION.RIGHT;

interface IHoverCardProps {
  children: JSX.Element;
  component: JSX.Element;
  customStyle?: string;
  customTipStyle?: string;
  containerPosition?: IPositions[];
  tipPosition?: IPositions;
  arrowAlign?: "start" | "end" | "center";
}

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
    }, 300);
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
          timeout={300}
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
              left: position === "right" ? "0.25rem" : "auto",
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
