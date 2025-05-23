import * as appTypes from './appTypes';
import {AppState} from './appTypes';

interface AppAction {
  type: string;
  data?: any;
}

const initialState: AppState = {
  kids: [],
  currentKid: null,
};

export default (
  state = initialState,
  {type, ...payload}: AppAction,
): AppState => {
  switch (type) {
    case appTypes.SET_CHILDS:
      return {
        ...state,
        kids: payload.data,
      };
    case appTypes.SET_CURRENT_KID:
      return {
        ...state,
        currentKid: payload.data,
      };
    default:
      return state;
  }
};
