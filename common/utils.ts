import Images from "@/public/assets/icons";
import moment from "moment";
import { MESSAGE_STATUS } from "./enums";

export const encodeToken = (data: string) => window.btoa(data);

export const decodeToken = (data: string) => window.atob(data);

export const setDataInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
export const getDataFromLocalStorage = (key: string) =>
  typeof window !== "undefined" ? localStorage.getItem(key) : "";

export const debounce = (callback: Function, wait: number = 100) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any) => {
    clearTimeout(timeoutId!);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
};

export const getTimeStamp = () => {
  return Math.round(new Date().getTime() / 1000);
};

export const isSameDay = (currentDay: string, previousDay: string) => {
  return (
    moment.unix(parseInt(currentDay)).format("DD/MM/YYYY") ===
    moment.unix(parseInt(previousDay)).format("DD/MM/YYYY")
  );
};

export const getCurrentDay = (timestamp: string) => {
  return moment.unix(parseInt(timestamp)).calendar(null, {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "DD MMM YYYY",
    sameElse: "DD MMM YYYY",
  });
};

export const formatTime = (timestamp: string) => {
  return moment.unix(parseInt(timestamp)).format("hh:mm A");
};

export const getStatusImage = (status: string) => {
  const { readIcon, sentIcon, deliveredIcon, errorIcon, rectangle } = Images;
  const icon =
    status === MESSAGE_STATUS.READ
      ? readIcon
      : status === MESSAGE_STATUS.DELIVERED
      ? deliveredIcon
      : status === MESSAGE_STATUS.FAILED
      ? errorIcon
      : sentIcon;

  return icon;
};
