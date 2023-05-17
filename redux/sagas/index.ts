import { all } from "redux-saga/effects";
import { commonSaga } from "./common.saga";
import { loginSaga } from "./login.saga";
import { messageSaga } from "./message.saga";
import { candidateSaga } from "./candidate.saga";

export default function* rootSaga() {
  yield all([...loginSaga, ...commonSaga, ...messageSaga, ...candidateSaga]);
}
