export const encode = (data: string) => {
  return window.btoa(data);
};

export const storeDataInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
