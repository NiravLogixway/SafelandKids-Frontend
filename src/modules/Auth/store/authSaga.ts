import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import * as authTypes from './authTypes';
import * as authActions from './authActions';
import * as authApi from '../api/authApi';
import toast from '@/utils/toast';
import {LoginPayload} from './authTypes';
import {navigate} from '@/navigation/NavigationService';
import {getItem, removeItem, setItem} from '@/utils/localstorage';

function* handleLogin({
  data,
  resolve,
  reject,
}: LoginPayload): Generator<any, void, any> {
  try {
    const res = yield call(authApi.login, data);
    if (res.jwt) {
      yield call(setItem, 'AUTH_TOKEN', res.jwt);
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
      yield call(setItem, 'AUTH_TOKEN', res.jwt);
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
    const token = yield call(getItem, 'AUTH_TOKEN');
    if (token) {
      const profile = yield call(authApi.me);
      yield put(authActions.setAuthUser(profile));
    }
  } catch (error: any) {
    yield call(handleLogout);
    toast.error(error.error?.message || 'Something went wrong!!');
  } finally {
    yield put(authActions.setAuthLoading(false));
  }
}

function* updateUserProfile({
  data,
  resolve,
  reject,
}: authTypes.UpdateUserProfilePayload): Generator<any, void, any> {
  try {
    const res = yield call(authApi.updateProfile, data);
    if (res.id) {
      yield put(authActions.setAuthUser(res));
      resolve(res);
    } else {
      reject(res.message);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Something went wrong!!');
    reject(error);
  } finally {
    yield put(authActions.setAuthLoading(false));
  }
}

function* handleLogout(): Generator<any, void, any> {
  try {
    yield call(removeItem, 'AUTH_TOKEN');
    yield call(removeItem, 'CURRENT_KID');
    yield put(authActions.removeAuthUser());
    setTimeout(() => {
      navigate('Login', {});
    }, 1000);
  } catch (error) {
    console.error('error : ', error);
  }
}

function* handleForgetPassword({
  email,
  resolve,
  reject,
}: authTypes.ForgetPasswordPayload): Generator<any, void, any> {
  try {
    const res = yield call(authApi.forgetPassword, email);
    if (res.ok) {
      toast.success(res.message);
      resolve(true);
    } else {
      reject(res.message);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Something went wrong!!');
    reject(error);
  }
}

function* handleResetPassword({
  data,
  resolve,
  reject,
}: authTypes.ResetPasswordPayload): Generator<any, void, any> {
  try {
    const res = yield call(authApi.resetPassword, data);
    if (res.ok) {
      toast.success('Password reset successfully');
      resolve(true);
      navigate('Login', {});
    } else {
      reject(res.message);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Something went wrong!!');
    reject(error);
  }
}

export function* watchSagas(): Generator<any, void, any> {
  yield takeLatest(authTypes.LOGIN as any, handleLogin);
  yield takeLatest(authTypes.REGISTER as any, handleRegister);
  yield takeLatest(authTypes.FORGET_PASSWORD as any, handleForgetPassword);
  yield takeLatest(authTypes.RESET_PASSWORD as any, handleResetPassword);
  yield takeLatest(authTypes.USER_PROFILE as any, getUserProfille);
  yield takeLatest(authTypes.UPDATE_USER_PROFILE as any, updateUserProfile);
  yield takeLatest(authTypes.LOGOUT as any, handleLogout);
}

export default function* runSagas(): Generator<any, void, any> {
  yield all([fork(watchSagas)]);
}
