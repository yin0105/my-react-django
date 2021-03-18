import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import {reducer as toastr} from 'react-redux-toastr';
import auth from './auth';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  toastr,
});
