import api from '@/api';
import {LoginPayload, RegisterPayload} from '../store/authTypes';

export const login = (data: LoginPayload['data']) => {
  return api('auth/local', data, 'post');
};

export const register = (data: RegisterPayload['data']) => {
  return api('auth/local/register', data, 'post');
};

export const getRoles = () => {
  return api('users-permissions/roles', null, 'get');
};

export const me = () => {
  return api('users/me', null, 'get');
};

export const updateProfile = (data: any) => {
  return api(`users/${data.id}`, data, 'put');
};

export const forgetPassword = (email: string) => {
  return api('auth/forgot-password', {email}, 'post');
};

export const resetPassword = (data: any) => {
  return api('auth/reset-password', data, 'post');
};
