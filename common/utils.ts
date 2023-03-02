export const encodeToken = (data: string) => {
  return window.btoa(data);
};

export const decodeToken = (data: string) => {
  return window.atob(data);
};

export const setDataInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
export const getDataFromLocalStorage = (key: string) => {
  return typeof window !== "undefined" ? localStorage.getItem(key) : "";
};

export const debounce = (callback: Function, wait: number = 100) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any) => {
    clearTimeout(timeoutId!);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
};
