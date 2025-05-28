import * as authTypes from './authTypes';
import {
  ForgetPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  UpdateUserProfilePayload,
} from './authTypes';
import {
  login as loginApi,
  register as registerApi,
  forgetPassword as forgetPasswordApi,
  resetPassword as resetPasswordApi,
} from '../api/authApi';

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

export const updateUserProfile = (
  data: UpdateUserProfilePayload['data'],
  resolve: UpdateUserProfilePayload['resolve'],
  reject: UpdateUserProfilePayload['reject'],
) => ({
  type: authTypes.UPDATE_USER_PROFILE,
  data,
  resolve,
  reject,
});

export const forgetPassword = (
  email: ForgetPasswordPayload['email'],
  resolve: ForgetPasswordPayload['resolve'],
  reject: ForgetPasswordPayload['reject'],
) => ({
  type: authTypes.FORGET_PASSWORD,
  email,
  resolve,
  reject,
});

export const resetPassword = (
  data: ResetPasswordPayload['data'],
  resolve: (value: boolean) => void,
  reject: (error: any) => void,
) => ({
  type: authTypes.RESET_PASSWORD,
  data,
  resolve,
  reject,
});
