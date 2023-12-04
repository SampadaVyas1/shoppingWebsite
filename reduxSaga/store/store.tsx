// import { configureStore } from "@reduxjs/toolkit";
// import rootreducer from "../reducers/rootreducer";
// import createSagaMiddleware from "redux-saga";

// console.log("store called");
// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: () => rootreducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
// });

// export default store;

// import { createStore, applyMiddleware } from "redux";
// import thunkMiddleware from "redux-thunk";

// import { composeWithDevTools } from "redux-devtools-extension";
// import rootreducer from "../reducers/rootreducer";
// import { configureStore } from "@reduxjs/toolkit";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
// console.log("store")
// const store = createStore(rootreducer, composedEnhancer);
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "../reducers/rootreducer";
import createSagaMiddleware from "redux-saga";
import productSaga from "../productSaga/productSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootreducer,
  middleware: () => [sagaMiddleware],
});
sagaMiddleware.run(productSaga)

export default store;
