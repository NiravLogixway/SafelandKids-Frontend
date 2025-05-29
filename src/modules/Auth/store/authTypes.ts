export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';
export const USER_PROFILE = 'USER_PROFILE';
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_AUTH_LOADING = 'SET_AUTH_LOADING';
export const REMOVE_AUTH_USER = 'REMOVE_AUTH_USER';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export interface AuthState {
  loading: boolean;
  user: Record<string, any>;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  data: {
    email: string;
    password: string;
  };
  resolve: (value: boolean) => void;
  reject: (error: any) => void;
}

export interface RegisterPayload {
  data: {
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
    passcode: string;
    role: number;
  };
  resolve: (value: boolean) => void;
  reject: (error: any) => void;
}

export interface UpdateUserProfilePayload {
  data: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    passcode: string;
    blocked?: boolean;
  };
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

export interface ForgetPasswordPayload {
  email: string;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

export interface ResetPasswordPayload {
  data: {
    code: string;
    password: string;
    passwordConfirmation: string;
  };
  resolve: (value: boolean) => void;
  reject: (error: any) => void;
}
