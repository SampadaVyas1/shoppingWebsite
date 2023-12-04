import {
  AddToCart,
  CATEGORIES_LIST,
  Empty_Card,
  PRODUCT_LIST,
  PRODUCT_SEARCH,
  Remove_To_Cart,
} from "../constant/constant";

export const addCart = (data: any) => {
  return {
    type: AddToCart,
    data: data,
  };
};

export const removetocart = (data: any) => {
  console.log("dataid", data);
  return {
    type: Remove_To_Cart,
    data: data,
  };
};

export const emptyCard = () => {
  return {
    type: Empty_Card,
  };
};

export const productList = () => {
  return {
    type: PRODUCT_LIST,
    data: "apple",
  };
};

export const productSearch = (data: any) => {
  console.log(data);
  return {
    type: PRODUCT_SEARCH,
    data: data,
  };
};

export const categoriesList = () => {
  console.log("categoriesList");
  return {
    type: CATEGORIES_LIST,
  };
};
