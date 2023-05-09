import { all } from "redux-saga/effects";

import { loginSaga } from "./login.saga";
import { techStackSaga } from "./techStack.saga";

export default function* rootSaga() {
  yield all([...loginSaga, ...techStackSaga]);
}
