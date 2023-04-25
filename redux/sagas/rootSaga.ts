import { all } from "redux-saga/effects";

import { loginSaga } from "./loginSaga";
import { commonSaga } from "./commonSaga";

export default function* rootSaga() {
  yield all([...loginSaga, ...commonSaga]);
}
