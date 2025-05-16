import axios, {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    return Promise.reject(error);
  },
);

client.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await AsyncStorage.getItem('AUTH_TOKEN');

  if (token && token !== null) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  config.headers.set('Content-Type', 'application/json');
  return config;
});

type ApiMethod = 'get' | 'post' | 'put' | 'delete';
type ApiResponse<T = any> = Promise<T>;

export default async function api<T = any>(
  path: string,
  payload: any,
  method: ApiMethod,
  ...rest: any[]
): ApiResponse<T> {
  try {
    return await new Promise((resolve, reject) => {
      client
        .request({
          method,
          url: path,
          responseType: 'json',
          ...(method !== 'get' && {data: payload}),
          ...rest,
        })
        .then((response: AxiosResponse<T>) => {
          return resolve(response.data);
        })
        .catch(error => {
          if (
            typeof error !== 'undefined' &&
            error !== null &&
            typeof error.response !== 'undefined' &&
            typeof error.response.data !== 'undefined'
          ) {
            return reject(error.response.data);
          } else {
            return reject(error);
          }
        });
    });
  } catch (error) {
    throw error;
  }
}
