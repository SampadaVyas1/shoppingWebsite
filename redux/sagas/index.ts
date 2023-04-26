import { all } from "redux-saga/effects";

import { commonSaga } from "./commonSaga";
import { loginSaga } from "./login.saga";

export default function* rootSaga() {
  yield all([...loginSaga, ...commonSaga]);
}
