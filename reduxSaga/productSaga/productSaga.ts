import { put, takeEvery } from "redux-saga/effects";
import {
  AddToCart,
  CATEGORIES_LIST,
  PRODUCT_LIST,
  PRODUCT_SEARCH,
  SET_CATEGORIES_LIST,
  SET_PRODUCT_LIST,
} from "../constant/constant";

function* getProducts(): any {
  let data = yield fetch("http://localhost:3500/product");

  const spdata = yield data.json();
  yield put({ type: SET_PRODUCT_LIST, data: spdata });
}

function* searchProduct(data: any): any {
  let result = yield fetch(`http://localhost:3500/product?q=${data.data}`);

  const spdata = yield result.json();
  yield put({ type: SET_PRODUCT_LIST, data: spdata });
}

function* getCategories(): any {
  let result = yield fetch("http://localhost:3004/subHeadingTitle");
  const data = yield result.json();
  yield put({
    type: SET_CATEGORIES_LIST,
    data: data,
  });
}

function* productSaga() {
  yield takeEvery(PRODUCT_LIST, getProducts);
  yield takeEvery(PRODUCT_SEARCH, searchProduct);
  yield takeEvery(CATEGORIES_LIST, getCategories);
}
export default productSaga;
