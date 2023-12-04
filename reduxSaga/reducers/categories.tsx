import { SET_CATEGORIES_LIST, SET_PRODUCT_LIST } from "../constant/constant";

export const categoriesFetchList = (data = [], action: any) => {
  switch (action.type) {
    case SET_CATEGORIES_LIST:
      return [...action.data];
    default:
      return data;
  }
};
