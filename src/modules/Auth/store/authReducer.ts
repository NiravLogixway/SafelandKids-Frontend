import * as authTypes from './authTypes';
import {AuthState} from './authTypes';

const initialState: AuthState = {
  loading: true,
  user: {},
  isAuthenticated: false,
};

interface AuthAction {
  type: string;
  data?: any;
  loading?: boolean;
}

export default (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case authTypes.SET_AUTH_USER:
      return {...state, user: action.data, isAuthenticated: true};

    case authTypes.REMOVE_AUTH_USER:
      return {...state, user: {}, isAuthenticated: false};

    case authTypes.SET_AUTH_LOADING:
      return {...state, loading: !!action.loading};

    case authTypes.LOGOUT:
      return {...state, user: {}, isAuthenticated: false};

    default:
      return state;
  }
};
