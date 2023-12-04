import {
  AddToCart,
  Empty_Card,
  PRODUCT_LIST,
  Remove_To_Cart,
  SET_PRODUCT_LIST,
} from "../constant/constant";

export const cartData = (data = [], action: any) => {
  switch (action.type) {
    case AddToCart:
      return [action.data, ...data];
    case Remove_To_Cart:
      const newResult = data.filter((item: any) => {
        return action.data != item.id;
      });
      return [...newResult];
    case Empty_Card:
      return [];
    default:
      return data;
  }
};
