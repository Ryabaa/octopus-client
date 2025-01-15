import { all, fork } from "redux-saga/effects";

import { watchAuthUser } from "@components/auth/sagas";

const rootSaga = function* () {
    yield all([fork(watchAuthUser)]);
};

export default rootSaga;
