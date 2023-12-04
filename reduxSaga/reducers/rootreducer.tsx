import { combineReducers } from "redux";
import { cartData } from "./cartData";
import { productList } from "./productList";
import { categoriesFetchList } from "./categories";
export default combineReducers({
  cartData,
  productList,
  categoriesFetchList,
});
