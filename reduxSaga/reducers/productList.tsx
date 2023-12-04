import { SET_PRODUCT_LIST } from "../constant/constant";

export const productList = (data = [], action: any) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return [...action.data];
    default:
      return data;
  }
};
