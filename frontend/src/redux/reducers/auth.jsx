import jwtDecode from 'jwt-decode';
import * as auth from '../actions/auth.jsx';

const initialState = {
  isFetching: false,
  access: undefined,
  refresh: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
    case auth.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh)
        },
        isFetching: false,
      };

    case auth.LOGIN_REQUEST:
    case auth.REFRESH_TOKEN_REQUEST:
    case auth.GET_USER_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case auth.LOGIN_FAILURE:
    case auth.LOGOUT:
    case auth.REFRESH_TOKEN_FAILURE:
    case auth.GET_USER_INFO_FAILURE:
      return initialState;

    case auth.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload
      };
    default:
      return state
  }
}