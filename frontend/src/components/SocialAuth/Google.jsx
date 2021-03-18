import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

export class GoogleSocialAuth extends Component {

  render() {
    const googleResponse = (response) => {
      console.log(response);
    }
    return (

        <GoogleLogin
          clientId="765098504593-vil60r077vkegjrli7cppsufgl1iia1h.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          // onSuccess={responseGoogle}
          // onFailure={responseGoogle}
        />
    );
  }
}

export default GoogleSocialAuth