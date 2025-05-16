import { all, fork } from 'redux-saga/effects';
import appSaga from '@/modules/App/store/appSaga';
import authSaga from '@/modules/Auth/store/authSaga';

export default function* rootSaga() {
  yield all([fork(appSaga), fork(authSaga)]);
}
