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
