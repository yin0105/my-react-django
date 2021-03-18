import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import googleLogin from "./GoogleService";

export class GoogleSocialAuth extends Component {

  render() {
    const googleResponse = (response) => {
      console.log("response in google", response);
      console.log("tokenObj = ", response.tokenObj);
      console.log("token = ", response.tokenObj.access_token);
      googleLogin(response.tokenObj.access_token);
    }
    return (

        <GoogleLogin
          clientId="90330061170-sffkbkaajtndi7ajpmica5vao9pim7n3.apps.googleusercontent.com"
          buttonText="Login WITH GOOGLE"
          onSuccess={googleResponse}
          onFailure={googleResponse}
        />
    );
  }
}

export default GoogleSocialAuth;




// 90330061170-sffkbkaajtndi7ajpmica5vao9pim7n3.apps.googleusercontent.com