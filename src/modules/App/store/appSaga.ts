import {all, fork, put, call, select, takeLatest} from 'redux-saga/effects';
import * as appTypes from './appTypes';
import * as appActions from './appActions';
import * as appApi from '../api/appApi';
import {RootState} from '@/store';

interface User {
  user_id: string;
  [key: string]: any;
}

const getUser = (state: RootState) => state.auth.user;

function* getChilds(): Generator<any, void, any> {
  try {
    const user = (yield select(getUser)) as User;
  } catch (error) {
    console.error('Error in getChilds saga:', error);
  }
}

export function* watchSagas(): Generator<any, void, any> {
  yield takeLatest(appTypes.GET_CHILDS, getChilds);
}

export default function* runSagas(): Generator<any, void, any> {
  yield all([fork(watchSagas)]);
}
