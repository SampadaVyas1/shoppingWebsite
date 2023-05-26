import React from "react";
import { Theme, toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageComponent from "@/components/imageComponent";
import Images from "@/public/assets/icons";
import { DEBOUNCE_TIME, TOAST_VARIANTS } from "@/common/constants";

const CloseButton = ({ closeToast }: any) => (
  <ImageComponent
    customClass="toast-close-button"
    src={Images.crossIcon}
    onClick={closeToast}
  />
);

export const notify = (
  hideProgressBar: boolean,
  toastBody: JSX.Element | string,
  toastId: number | string,
  onClose?: (toastId: number | string) => void,
  type: TypeOptions = TOAST_VARIANTS.SUCCESS as TypeOptions,
  autoClose: number | false = DEBOUNCE_TIME.TOAST_DEBOUNCE
) => {
  const handleClose = () => {
    toast.dismiss(toastId);
    onClose && onClose(toastId);
  };
  toast(toastBody, {
    position: toast.POSITION.TOP_CENTER,
    type: type,
    autoClose: autoClose,
    hideProgressBar: hideProgressBar,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: TOAST_VARIANTS.LIGHT_THEME as Theme,
    toastId: toastId,
    onClose: handleClose,
    pauseOnFocusLoss: false,
    closeButton: CloseButton,
  });
};
