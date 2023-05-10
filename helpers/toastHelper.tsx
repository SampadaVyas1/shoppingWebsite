import ImageComponent from "@/components/image";
import Images from "@/public/assets/icons";
import React from "react";
import { toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CloseButton = ({ closeToast }: any) => (
  <ImageComponent
    customClass="toast-close-button"
    src={Images.close}
    onClick={closeToast}
  />
);

export const notify = (
  hideProgressBar: boolean,
  toastBody: JSX.Element | string,
  toastId: number | string,
  onClose?: (toastId: number | string) => void,
  type: TypeOptions = "success",
  autoClose: number | false = 2000
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
    theme: "light",
    toastId: toastId,
    onClose: handleClose,
    pauseOnFocusLoss: false,
    closeButton: CloseButton,
  });
};
