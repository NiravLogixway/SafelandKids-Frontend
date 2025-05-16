import * as authTypes from './authTypes';
import {LoginPayload, RegisterPayload} from './authTypes';

export const login = (
  data: LoginPayload['data'],
  resolve: LoginPayload['resolve'],
  reject: LoginPayload['reject'],
) => ({
  type: authTypes.LOGIN,
  data,
  resolve,
  reject,
});

export const register = (
  data: RegisterPayload['data'],
  resolve: RegisterPayload['resolve'],
  reject: RegisterPayload['reject'],
) => ({
  type: authTypes.REGISTER,
  data,
  resolve,
  reject,
});

export const logout = () => ({type: authTypes.LOGOUT});

export const getUserProfile = () => ({type: authTypes.USER_PROFILE});

export const setAuthUser = (data: any) => ({
  type: authTypes.SET_AUTH_USER,
  data,
});

export const setAuthLoading = (loading: boolean) => ({
  type: authTypes.SET_AUTH_LOADING,
  loading,
});

export const removeAuthUser = () => ({type: authTypes.REMOVE_AUTH_USER});
