import ImageComponent from "@/components/imageComponent";
import Images from "@/public/assets/icons";
import React from "react";
import { toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  type: TypeOptions = "success"
) => {
  const handleClose = () => {
    toast.dismiss(toastId);
    onClose && onClose(toastId);
  };
  toast(toastBody, {
    position: toast.POSITION.TOP_CENTER,
    type: type,
    autoClose: 2000,
    hideProgressBar: hideProgressBar,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    toastId: toastId,
    onClose: handleClose,
    pauseOnFocusLoss: false,
    closeButton: CloseButton,
  });
};
