import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import * as authTypes from './authTypes';
import * as authActions from './authActions';
import * as authApi from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast from '@/utils/toast';
import {LoginPayload} from './authTypes';
import {navigate} from '@/navigation/NavigationService';

function* handleLogin({
  data,
  resolve,
  reject,
}: LoginPayload): Generator<any, void, any> {
  try {
    const res = yield call(authApi.login, data);
    if (res.jwt) {
      yield call(AsyncStorage.setItem, 'AUTH_TOKEN', res.jwt);
      yield put(authActions.setAuthUser(res.user));
      toast.success('Login successfully');
      resolve(true);
    } else {
      toast.error(res.message || 'Something went wrong!!');
      reject(res.message);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Something went wrong!!');
    reject(error);
  }
}

function* handleRegister({
  data,
  resolve,
  reject,
}: authTypes.RegisterPayload): Generator<any, void, any> {
  try {
    const payload = {...data};

    const res = yield call(authApi.register, payload);

    if (res.jwt) {
      yield call(AsyncStorage.setItem, 'AUTH_TOKEN', res.jwt);
      yield put(authActions.setAuthUser(res.user));
      toast.success('Registration successfully');
      resolve(true);
    } else {
      reject(res.message);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Something went wrong!!');
    reject(error);
  }
}

function* getUserProfille(): Generator<any, void, any> {
  try {
    yield put(authActions.setAuthLoading(true));
    const token = yield call(AsyncStorage.getItem, 'AUTH_TOKEN');
    if (token) {
      const profile = yield call(authApi.me);
      yield put(authActions.setAuthUser(profile));
    } else {
      yield call(handleLogout);
    }
  } catch (error: any) {
    yield call(handleLogout);
    toast.error(error.error?.message || 'Something went wrong!!');
  } finally {
    yield put(authActions.setAuthLoading(false));
  }
}

function* handleLogout(): Generator<any, void, any> {
  try {
    yield call(AsyncStorage.removeItem, 'AUTH_TOKEN');
    yield put(authActions.removeAuthUser());
    setTimeout(() => {
      navigate('Login', {});
    }, 1000);
  } catch (error) {
    console.log('error : ', error);
  }
}

export function* watchSagas(): Generator<any, void, any> {
  yield takeLatest(authTypes.LOGIN as any, handleLogin);
  yield takeLatest(authTypes.REGISTER as any, handleRegister);
  yield takeLatest(authTypes.USER_PROFILE as any, getUserProfille);
  yield takeLatest(authTypes.LOGOUT as any, handleLogout);
}

export default function* runSagas(): Generator<any, void, any> {
  yield all([fork(watchSagas)]);
}
