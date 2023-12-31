import moment from "moment";
import { HEADER, PAGE_CONSTANTS, TIME_FORMAT } from "../constants";
import Images from "@/public/assets/icons";
import { MESSAGE_STATUS, MESSAGE_TYPES } from "../types/enums";

interface IData {
  [key: string]: any;
}

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

export const sortDataByField = (
  data: any[],
  field: string,
  ascending: boolean = true
) => {
  const modifier = ascending ? 1 : -1;
  if (field === PAGE_CONSTANTS.CANDIDATES) {
    return [...data].sort((a, b) =>
      ascending ? a.candidates - b.candidates : b.candidates - a.candidates
    );
  }
  return [...data]?.sort(
    (column1: { [key: string]: any }, column2: { [key: string]: any }) => {
      const element1 = column1[field].toUpperCase();
      const element2 = column2[field].toUpperCase();
      if (element1 < element2) {
        return -1 * modifier;
      }
      if (element1 > element2) {
        return 1 * modifier;
      }
      return 0;
    }
  );
};

export const checkMaster = (selectedRow: number[], data: IData[] | null) => {
  return (
    !!selectedRow.length &&
    selectedRow?.filter((id) => data?.map((row) => row?.id).includes(id))
      .length === data?.length
  );
};

export const checkIdeal = (selectedRow: number[], data: IData[]) => {
  const newdata =
    !!data &&
    data?.filter((item) => selectedRow?.find((param) => param === item?.id));
  return !checkMaster(selectedRow, data) &&
    ((!!newdata.length && newdata.length < newdata?.length) ||
      selectedRow?.length)
    ? true
    : false;
};

export const handleAllRowSelect = (
  data: IData[],
  selectedRow: number[],
  onSelectedRowChange: (value: number[]) => void
) => {
  const filteredArray = selectedRow?.filter(
    (id: number) => !!data && !data?.map((row) => row.id).includes(id)
  );
  if (onSelectedRowChange) {
    selectedRow?.length - filteredArray?.length === data?.length
      ? onSelectedRowChange([...filteredArray])
      : onSelectedRowChange([
          ...filteredArray,
          ...data.map((row: { [key: string]: any }) => row.id),
        ]);
  }
};

export function checkRow(id: number, selectedRow: number[]) {
  return selectedRow?.includes(id);
}

export const toCamelCase = (str: string) => {
  let words = str.toLowerCase().split(/[\s-]+/);
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join("");
};

export const setDataInSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, value);
};
export const getDataFromSessionStorage = (key: string) =>
  typeof window !== "undefined" ? sessionStorage.getItem(key) : "";

export const getTimeStamp = () => {
  return Math.round(new Date().getTime() / 1000);
};

export const isSameDay = (currentDay: string, previousDay: string) => {
  return (
    moment.unix(parseInt(currentDay)).format(TIME_FORMAT.DATE_MONTH) ===
    moment.unix(parseInt(previousDay)).format(TIME_FORMAT.DATE_MONTH)
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
  return moment.unix(parseInt(timestamp)).format(TIME_FORMAT.HOUR_MINUTE);
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

export const formatTemplateName = (templateName: string) => {
  return templateName?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};

export const formatTemplateData = (
  template: any,
  candidateName: string,
  messageId: string,
  timestamp: string
) => {
  const templateName = template?.name;
  const components = template?.components.filter(
    (component: any) => component.type === HEADER
  );
  const templateComponents = {
    type: "header",
    parameters: components?.map((component: any) => {
      const [imageLink, ...otherElements] =
        component?.example?.header_handle ?? [];
      return {
        type: component.format.toLowerCase(),
        [component.format.toLowerCase()]:
          component.format.toLowerCase() === MESSAGE_TYPES.IMAGE
            ? { link: imageLink }
            : candidateName,
      };
    }),
  };

  return {
    name: templateName,
    components: [templateComponents],
    messageId: messageId,
  };
};

export const formatTemplateHeader = (
  header: string,
  replacementText: string
) => {
  return header?.replace("{{1}}", replacementText);
};
