import {all, fork, put, call, select, takeLatest} from 'redux-saga/effects';
import * as appTypes from './appTypes';
import * as appActions from './appActions';
import * as appApi from '../api/appApi';
import {RootState} from '@/store';
import {navigate} from '@/navigation/NavigationService';
import toast from '@/utils/toast';

interface User {
  id: string;
  [key: string]: any;
}

const getUser = (state: RootState) => state.auth.user;

function* getKids(): Generator<any, void, any> {
  try {
    const user = (yield select(getUser)) as User;
    const response = yield call(appApi.getKidsList, user.id);
    if (response?.length) {
      yield put(appActions.setKids(response));
    }
  } catch (error) {
    console.error('Error in getKids saga:', error);
  }
}

function* addKid(action: appTypes.AddKidAction): Generator<any, void, any> {
  try {
    const user = (yield select(getUser)) as User;
    const payload = {
      data: {
        ...action.data,
        parent: user.id,
      },
    };
    const response = yield call(appApi.addKid, payload);
    if (response?.data?.id) {
      yield call(getKids);
      navigate('Home', {});
      toast.success('Child added successfully');
      action.resolve(response.data);
    } else {
      action.reject(response.data);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Failed to add child');
    console.error('Error in addKid saga:', error);
  }
}
function* updateKid(
  action: appTypes.UpdateKidAction,
): Generator<any, void, any> {
  try {
    const kid = action.data;
    const response = yield call(appApi.updateKid as any, kid.id, {data: kid});
    console.log(response, 'response');
    if (response?.data?.id) {
      yield call(getKids);
      navigate('Home', {});
      toast.success('Child updated successfully');
      action.resolve(response.data);
    } else {
      action.reject(response.data);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Failed to update child');
    console.error('Error in updateKid saga:', error);
  }
}

export function* watchSagas(): Generator<any, void, any> {
  yield takeLatest(appTypes.GET_CHILDS, getKids);
  yield takeLatest(appTypes.ADD_KID, addKid);
  yield takeLatest(appTypes.UPDATE_KID, updateKid);
}

export default function* runSagas(): Generator<any, void, any> {
  yield all([fork(watchSagas)]);
}
