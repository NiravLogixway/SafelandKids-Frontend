import * as appTypes from './appTypes';
import {AppState} from './appTypes';

interface AppAction {
  type: string;
  data?: any;
}

const initialState: AppState = {
  primaryStudent: {},
};

export default (
  state = initialState,
  {type, ...payload}: AppAction,
): AppState => {
  switch (type) {
    case appTypes.SET_PRIMARY_STUDENT:
      return {
        ...state,
        primaryStudent: payload.data,
      };

    default:
      return state;
  }
};
