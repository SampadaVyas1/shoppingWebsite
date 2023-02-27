export const encode = (data: string) => {
  return window.btoa(data);
};

export const decode = (data: string) => {
  return window.atob(data);
};

export const storeDataInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
export const fetchDataFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
