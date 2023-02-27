import { EVENT } from "@/common/enums";
import React, { useRef, useCallback, useEffect, HTMLAttributes } from "react";
import { EVENT_TYPE } from "../../common/constants";

interface props extends HTMLAttributes<HTMLDivElement> {
  event?:
    | EVENT.CLICK
    | EVENT.MOUSE_DOWN
    | EVENT.MOUSE_UP
    | EVENT.POINTER_DOWN
    | EVENT.POINTER_UP;
  children: React.ReactNode;
  handleClose: () => void;
  customClass?: string;
}

const ClickAwayListener = (props: props) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { event, children, customClass, handleClose, ...otherProps } = props;

  const handleClickOutside = useCallback(
    (event: any) => {
      const { handleClose } = props;
      if (ref?.current && !ref.current.contains(event.target)) {
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
