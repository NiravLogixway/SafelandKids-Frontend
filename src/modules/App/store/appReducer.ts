import * as appTypes from './appTypes';
import {AppState} from './appTypes';

interface AppAction {
  type: string;
  data?: any;
}

const initialState: AppState = {
  kids: [],
  currentKid: null,
  playlists: [],
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
        ...(!payload.data ? {playlists: []} : {}),
      };
    case appTypes.SET_PLAYLISTS:
      return {
        ...state,
        playlists: payload.data,
      };
    case appTypes.REMOVE_STATE:
      return initialState;
    default:
      return state;
  }
};
