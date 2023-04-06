import React, { useRef, useCallback, useEffect, HTMLAttributes } from "react";
import { EVENT_TYPE } from "../../common/constants";
import { IClickAwayProps } from "./clickAway.types";

const ClickAwayListener = (props: IClickAwayProps) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { event, children, customClass, handleClose, ...otherProps } = props;

  const handleClickOutside = useCallback(
    (event: MouseEvent | UIEvent | Event | PointerEvent | WheelEvent) => {
      const { handleClose } = props;
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        handleClose && handleClose();
      }
    },
    [props]
  );

  useEffect(() => {
    const { event = EVENT_TYPE.MOUSE_DOWN } = props;
    window.document.addEventListener(event, handleClickOutside);
    return () => {
      const { event = EVENT_TYPE.MOUSE_DOWN } = props;
      window.document.removeEventListener(event, handleClickOutside);
    };
  }, [handleClickOutside, handleClose, props]);

  return (
    <div ref={ref} className={customClass} {...otherProps}>
      {children}
    </div>
  );
};

export default ClickAwayListener;
