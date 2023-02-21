import React, { useRef, useCallback, useEffect, HTMLAttributes } from "react";
import { MOUSE_DOWN } from "../../helpers/constants";

interface props extends HTMLAttributes<HTMLDivElement> {
  event?: "click" | "mousedown" | "mouseup" | "pointerdown" | "pointerup";
  children: React.ReactNode;
  handleClose: () => void;
  customClass?: string;
}

function ClickAwayListener(props: props) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { event, children, customClass, handleClose, ...otherProps } = props;

  useEffect(() => {
    const { event = MOUSE_DOWN } = props;
    window.document.addEventListener(event, handleClickOutside);
    return () => {
      const { event = MOUSE_DOWN } = props;
      window.document.removeEventListener(event, handleClickOutside);
    };
  }, [handleClose]);

  const handleClickOutside = useCallback(
    (event: any) => {
      const { handleClose } = props;
      if (ref?.current && !ref.current.contains(event.target)) {
        handleClose && handleClose();
      }
    },
    [handleClose]
  );

  return (
    <div ref={ref} className={customClass} {...otherProps}>
      {children}
    </div>
  );
}

export default ClickAwayListener;
