import axios, {AxiosResponse, AxiosError, AxiosHeaders} from 'axios';
import {getItem} from '../utils/localstorage';
import {API_URL} from '@env';
import toast from '../utils/toast';

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

async function refreshToken(): Promise<string> {
  return 'new_access_token';
}

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the token and update header
        const token: any = await getItem('AUTH_TOKEN');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Clone the original request and retry the request
        const originalRequest = error.config as any;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

client.interceptors.request.use(async config => {
  const token = await getItem('AUTH_TOKEN');
  if (token && token !== '' && token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default async function api(
  path: string,
  payload: any,
  method: string,
  params?: any,
  ...rest: any[]
) {
  try {
    return await new Promise((resolve, reject) => {
      client
        .request({
          method: method,
          url: path,
          responseType: 'json',
          data: payload,
          params,
          ...rest,
        })
        .then(response => {
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
  } catch (error: any) {
    toast.error(error?.error?.message || 'something went wrong!!');
  }
}
