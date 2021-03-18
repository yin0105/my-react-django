import {store} from '../redux/store.jsx';
import ApiHelper from './apiHelper.jsx';

class AuthHelper {
  login = (email, password) => {
    return ApiHelper.post('/api/auth/login', {email, password}, {}, false);
  };

  register = (firstName, lastName, email, password) => {
    return ApiHelper.post('/api/auth/register', {firstName, lastName, email, password}, {}, false);
  };

  refreshToken = data => {
    return ApiHelper.post('/api/auth/token/refresh', data, {}, false);
  };

  getUserInfo = () => {
    return ApiHelper.get('/api/auth/user');
  };

  getAccessToken = () => {
    let state = store.getState();
    if (state.auth.access) {
      return state.auth.access.token;
    }
    return null;
  };

  getRefreshToken = () => {
    let state = store.getState();
    if (state.auth.refresh) {
      return state.auth.refresh.token;
    }
    return null;
  };

  isAccessTokenExpired = state => {
    if (state.access && state.access.exp) {
      return 1000 * state.access.exp - (new Date()).getTime() < 5000;
    }
    return true;
  };

  isRefreshTokenExpired = state => {
    if (state.refresh && state.refresh.exp) {
      return 1000 * state.refresh.exp - (new Date()).getTime() < 5000;
    }
    return true;
  };

  isAuthenticated = state => {
    return !this.isRefreshTokenExpired(state);
  };

  updateProfile = profile => {
    return ApiHelper.put('/api/auth/user', profile);
  }

}

export default new AuthHelper();

