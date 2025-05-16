import pubsub from 'sweet-pubsub';
import {get} from 'lodash';

interface Toast {
  type: string;
  position: string;
  message: string;
  visibilityTime: number;
  topOffset: number;
}

const show = (toast: Toast): void => {
  pubsub.emit('toast', toast);
};

const success = (message: string): void => {
  show({
    type: 'success',
    position: 'top',
    message: get(message, 'message', message) as string,
    visibilityTime: 4000,
    topOffset: 60,
  });
};

const error = (err: string | {message: string}): void => {
  show({
    type: 'danger',
    position: 'top',
    message: get(err, 'message', err) as string,
    visibilityTime: 4000,
    topOffset: 60,
  });
};

const info = (data: string | {message: string}): void => {
  show({
    type: 'info',
    position: 'top',
    message: get(data, 'message', data) as string,
    visibilityTime: 4000,
    topOffset: 60,
  });
};

const warning = (data: string | {message: string}): void => {
  show({
    type: 'warning',
    position: 'top',
    message: get(data, 'message', data) as string,
    visibilityTime: 4000,
    topOffset: 60,
  });
};

const danger = (data: string | {message: string}): void => {
  show({
    type: 'error',
    position: 'top',
    message: get(data, 'message', data) as string,
    visibilityTime: 4000,
    topOffset: 60,
  });
};

const showToastOnSubscribe = (data: any) => {
  show({
    type: 'info',
    position: 'top',
    message: data?.message || '',
    visibilityTime: parseInt(data?.progress) >= 100 ? 2000 : 3000000,
    topOffset: 60,
  });
};

const publish = (eventName: any, progress: any) => pubsub.pub(eventName, progress);

const subscribe = (eventName: string) => {
  pubsub.sub(eventName, showToastOnSubscribe);
};

const unsubscribe = (eventName: string) => {
  pubsub.unsub(eventName, showToastOnSubscribe);
};

export default {show, error, success, info, warning, danger, publish, subscribe, unsubscribe};
