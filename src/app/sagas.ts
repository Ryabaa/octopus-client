import { all, fork } from "redux-saga/effects";

import { watchAuthUser } from "@components/auth/sagas";
import { watchFetchProducts } from "@components/catalog/sagas";
import { watchCartSaga } from "@components/cart/sagas";

const rootSaga = function* () {
    yield all([fork(watchAuthUser), fork(watchFetchProducts), fork(watchCartSaga)]);
};

export default rootSaga;
