import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter  } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor, history} from './redux/store.jsx';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/sass/light-bootstrap-dashboard-pro-react.scss?v=1.2.0";
import "assets/css/demo.css";
import "assets/css/pe-icon-7-stroke.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import AdminLayout from "./containers/Layout/Admin";
import RegisterPage from "./containers/Login/Register";
import LoginPage from "./containers/Login";
import EmailVerificationPage from "./containers/Login/EmailVerification";
import ResetPasswordEmail from "./containers/Login/ResetPasswordEmail";
import ResetPassword from "./containers/Login/ResetPassword";
import CompanyPage from "./containers/Company";
import CompanyDetailPage from "./containers/Company/details";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter  history={history}>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={CompanyPage}/>
            <Route exact path="/company/detail" component={CompanyDetailPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/login/email_verification" component={EmailVerificationPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/reset_password" component={ResetPasswordEmail}/>
            <Route exact path="/login/reset_password" component={ResetPassword}/>
            <PrivateRoute path="/admin" component={AdminLayout}/>
          </Switch>
          <ReduxToastr timeOut={3000} transitionIn="fadeIn" transitionOut="fadeOut"/>
        </React.Fragment>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
