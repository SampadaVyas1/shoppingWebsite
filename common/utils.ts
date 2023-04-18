import { useCallback } from "react";

interface IData {
  [key: string]: any;
}

interface IButtonState {
  [key: string]: { upKeyDisabled: boolean; downKeyDisabled: boolean };
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

export const handleSort = (
  data: IData[],
  field: string,
  ascending: boolean = true
) => {
  const modifier = ascending ? 1 : -1;
  return data?.sort(
    (column1: { [key: string]: any }, column2: { [key: string]: any }) => {
      const nameA = column1[field].toUpperCase();
      const nameB = column2[field].toUpperCase();
      if (nameA < nameB) {
        return -1 * modifier;
      }
      if (nameA > nameB) {
        return 1 * modifier;
      }
      return 0;
    }
  );
};

export const handleAscendingSort = (
  field: string,
  setButtonState: any,
  data: IData[],
  setData: any
) => {
  setButtonState((buttonState: IButtonState) => ({
    ...buttonState,
    [field]: {
      ...buttonState[field],
      upKeyDisabled: true,
      downKeyDisabled: false,
    },
  }));
  const newData = !!data && handleSort(data, field, true);
  setData(newData);
};

export const handleDescendingSort = (
  field: string,
  setButtonState: any,
  data: IData[],
  setData: any
) => {
  setButtonState((buttonState: IButtonState) => ({
    ...buttonState,
    [field]: {
      ...buttonState[field],
      upKeyDisabled: false,
      downKeyDisabled: true,
    },
  }));
  const newData =!!data && handleSort(data, field, false);
  setData(newData);
};

export const checkMaster = (selectedRow: number[], data: IData[] | null) => {
  return (
    !!selectedRow.length &&
    selectedRow?.filter((id) => data?.map((row: any) => row?.id).includes(id))
      .length === data?.length
  );
};

export const checkIdeal = (selectedRow: number[], data: IData[]) => {
  const newdata =
    !!data &&
    data?.filter((item: any) =>
      selectedRow?.find((param) => param === item?.id)
    );
  return !checkMaster(selectedRow, data) &&
    ((!!newdata.length && newdata.length < newdata?.length) ||
      selectedRow?.length)
    ? true
    : false;
};

export function handleAllRowSelect(
  data: IData[],
  selectedRow: number[],
  onSelectedRowChange: any
) {
  const handleSelect = useCallback(() => {
    const filteredArray = selectedRow?.filter(
      (id: number) => !!data && !data?.map((row: any) => row.id).includes(id)
    );
    if (onSelectedRowChange) {
      selectedRow?.length - filteredArray?.length === data?.length
        ? onSelectedRowChange([...filteredArray])
        : onSelectedRowChange([
            ...filteredArray,
            ...data.map((row: { [key: string]: any }) => row.id),
          ]);
    }
  }, [selectedRow, data]);

  return handleSelect;
}

export function checkRow(id: number, selectedRow: number[]) {
  return selectedRow?.includes(id);
}

export const handleRowEachSelect = (
  row: number,
  selectedRow: number[],
  onSelectedRowChange: any
) => {
  const filteredRow = selectedRow?.filter((singleRow: number) => {
    return singleRow !== row;
  });
  if (onSelectedRowChange) {
    if (filteredRow?.length !== selectedRow?.length) {
      onSelectedRowChange([...filteredRow]);
    } else {
      const selectedrow = [...selectedRow];
      selectedrow.push(row);
      onSelectedRowChange([...selectedrow]);
    }
  }
};
