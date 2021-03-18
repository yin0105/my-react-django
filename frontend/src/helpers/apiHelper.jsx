import axios from 'axios';
import AuthHelper from './authHelper.jsx';
import {store} from '../redux/store.jsx';
import {refreshToken} from '../redux/actions/auth.jsx';
import NProgress from 'nprogress';

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  NProgress.done();
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  NProgress.done();
  return response;
}, function (error) {
  NProgress.done();
  // Do something with response error
  return Promise.reject(error);
});

const withAuth = (headers = {}) => {
  return {
    ...headers,
    'Authorization': 'Bearer ' + AuthHelper.getAccessToken(),
  }
};

const base = (method, url, data = {}, headers = {}, secure = true) => {
  if (secure) {
    let state = store.getState();
    if (AuthHelper.isAccessTokenExpired(state.auth)) {
      return store.dispatch(refreshToken())
        .then(res => {
          return axios({
            method,
            url,
            data,
            headers: withAuth(headers),
          });
        })
    } else {
      return axios({
        method,
        url,
        data,
        headers: withAuth(headers),
      });
    }
  } else {
    return axios({
      method,
      url,
      data,
      headers,
    });
  }
};

const ApiHelper = {};

['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
  ApiHelper[method] = base.bind(null, method);
});

export default ApiHelper;
