import React, { Component } from "react";
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import FormFeedback from "reactstrap/es/FormFeedback";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import AuthHelper from '../../helpers/authHelper.jsx';
import {login} from '../../redux/actions/auth.jsx';
import {validateEmail} from '../../helpers/commonHelper.jsx';
import {toastr} from "react-redux-toastr";
import logoImage from "../../assets/img/andnowuknow.svg";
import bgImage from "../../assets/img/full-screen-image.jpg";
import GoogleSocialAuth from "../../components/SocialAuth/Google";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      errors: {
        email: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
  }

  handleLogin = e => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    let errors = this.state.errors;

    if (email === '') {
      errors.email = 'Email is required';
      this.setState({errors});
      return;
    }

    if (!validateEmail(email)) {
      errors.email = 'Email is invalid.';
      this.setState({errors});
      return;
    }

    if (password === '') {
      errors.password = 'Password is required';
      this.setState({errors});
      return;
    }

    this.props.login(email, password)
      .catch(err => {
        // console.log(err.response.data.non_field_errors[0]);
        if (err.response.data.non_field_errors[0] === 'register') {
          toastr.error('Login Failed!', 'Please register');
          this.props.history.push('/register')
        }else if (err.response.data.non_field_errors[0] === 'email') {
          toastr.error('Login Failed!', 'Please verify your email address');
          // this.props.history.push('/login/email_verification')
        }else if (err.response.data.non_field_errors[0] === 'password') {
          toastr.error('Login Failed!', 'Invalid password');
          this.props.history.push('/login')
        }
      })
  };

  handleChangeInput = e => {
    let errors = this.state.errors;
    if (errors[e.target.name] !== '') {
      errors[e.target.name] = '';
      this.setState(errors);
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to='/admin/my_profile'/>
      )
    } else {
      let {errors} = this.state;
      const url = `/reset_password`;
      return (
        <div>
        <div className="wrapper wrapper-full-page">
          <div
            className={"full-page login"}
            data-color="black"
            data-image={bgImage}
          >
            <div className="content">
              <Grid>
          <Row>
            <Col md={6} sm={12} mdOffset={3} smOffset={3}>
              <Form onSubmit={this.handleLogin}>
                <Card
                  hidden={this.state.cardHidden}
                  textCenter
                  title={
                    <div>
                      <img src={logoImage} className="logo" alt=""/>
                      <hr />
                      <span>Join to AndNowUKnow Fresh Produce Industry News</span>
                    </div>
                  }
                  content={
                    <Row>
                      <Col md={8} mdOffset={2}>
                        <FormGroup className="text-center">
                          <GoogleSocialAuth />
                          {/*<Button wd fill google >*/}
                          {/*  <i className="fa fa-google" /> Login with Google*/}
                          {/*</Button>*/}
                        </FormGroup>
                        <FormGroup className="text-center">
                          <Button wd fill linkedin>
                            <i className="fa fa-linkedin" /> Login with Linkedin
                          </Button>
                        </FormGroup>
                        <FormGroup className="text-center">
                          <Button wd fill behance>
                            <i className="fa fa-windows" /> Login with Microsoft
                          </Button>
                        </FormGroup>
                        <FormGroup className="text-center margin-top">
                          <span> OR </span>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Email Address<span className="star">*</span></ControlLabel>
                          <FormControl placeholder="Email Address" name="email" type="email"
                                       autoComplete="off" onChange={this.handleChangeInput}/>
                          <FormFeedback className="text-danger">{errors.email}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Password<span className="star">*</span></ControlLabel>
                          <FormControl placeholder="Password" name="password" type="password" autoComplete="off"
                                       onChange={this.handleChangeInput}/>
                          <div className="text-right">
                            <a href={url} >Forgot your Password?</a>
                          </div>
                          <FormFeedback className="text-danger">{errors.password}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                  }
                  legend={
                    <div>
                      <Row>
                        <Button bsStyle="success" fill wd type="submit">
                          Login
                        </Button>
                      </Row>
                      <Row>
                        <span>Don't you have an account? </span>
                        <a href="/register">Join</a>
                      </Row>
                    </div>
                  }
                  ftTextCenter
                />
              </Form>
            </Col>
          </Row>
        </Grid>

              </div>
            <div
              className="full-page-background"
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            >
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: AuthHelper.isAuthenticated(state.auth)
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
