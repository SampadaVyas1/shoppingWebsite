import { CANDIDATES } from "../constants";

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
  if (field === CANDIDATES) {
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
