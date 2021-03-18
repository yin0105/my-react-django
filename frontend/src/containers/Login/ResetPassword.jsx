import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toastr} from "react-redux-toastr";
import queryString from "query-string";
import {Redirect} from "react-router-dom";
import {FormFeedback} from "reactstrap"
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import bgImage from "../../assets/img/full-screen-image.jpg";
// import AuthNavbar from "../Layout/Navbars/AuthNavbar.jsx";
import AuthHelper from '../../helpers/authHelper.jsx';
import ApiHelper from '../../helpers/apiHelper.jsx';
import logoImage from "../../assets/img/andnowuknow.svg";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden : true,
      errors: {
        password: '',
        confirmPassword: '',
      }
    }
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
  }

  componentWillMount() {
    this.parameters = queryString.parse(this.props.location.search);
    if (!this.parameters.uid || !this.parameters.token) {
      this.props.history.push('/login')
    }
  }

  handleLogin = e => {
    e.preventDefault();
    let password = e.target.elements.password.value;
    let confirmPassword = e.target.elements.confirmPassword.value;
    let errors = this.state.errors;

    if (password === '') {
      errors.password = 'Password is required.';
      this.setState(errors);
      return;
    }

    if (confirmPassword === '') {
      errors.confirmPassword = 'ConfirmPassword is required.';
      this.setState(errors);
      return;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Password does not match.';
      this.setState(errors);
      return;
    }

    ApiHelper.post('/api/auth/login/reset_password', {
      uid: this.parameters.uid,
      token: this.parameters.token,
      password
    }, {},  false).then(res => {
      toastr.success('Success!', 'Password was successfully reset.');
      this.props.history.push('/login');
    }).catch(err => {
      toastr.error('Fail!', 'Password was already created.');
      // this.props.history.push('/login');
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
        <Redirect to='/'/>
      );
    }

    let {errors} = this.state;

    return (
      <div>
        {/*<AuthNavbar />*/}
        <div className="wrapper wrapper-full-page">
          <div
            className={"full-page login"}
            data-color="black"
            data-image={bgImage}
          >
            <div className="content">
              <Grid>
                <Row>
                  <Col md={4} sm={12} mdOffset={4} smOffset={3}>
                    <form onSubmit={this.handleLogin}>
                      <Card
                        hidden={this.state.cardHidden}
                        textCenter
                        title={
                          <div>
                            <img src={logoImage} className="logo" alt=""/>
                            <hr />
                            <span>Reset Your Password</span>
                          </div>
                        }
                        content={
                          <div>
                            {/*<Col md={8} mdOffset={2}>*/}
                              <FormGroup>
                                <ControlLabel>Password<span className="star">*</span></ControlLabel>
                                <FormControl placeholder="Password" name="password" type="password" autoComplete="off"
                                             invalid={errors.password !== ''} onChange={this.handleChangeInput}/>
                                <FormFeedback className="text-danger">{errors.password}</FormFeedback>
                              </FormGroup>
                              <FormGroup>
                              <ControlLabel>Confirm Password<span className="star">*</span></ControlLabel>
                              <FormControl placeholder="Confirm Password" type="password" autoComplete="off"
                                           name="confirmPassword" invalid={errors.confirmPassword !== ''}
                                           onChange={this.handleChangeInput}/>
                              <FormFeedback className="text-danger">{errors.confirmPassword}</FormFeedback>
                            </FormGroup>
                            {/*</Col>*/}
                          </div>
                        }
                        legend={
                          <div>
                            <Button bsStyle="success" fill wd type="submit">
                              Save
                            </Button>
                            {/*<Button simple onClick={() => this.props.history.push('/login')}>*/}
                            {/*  Cancel*/}
                            {/*</Button>*/}
                          </div>
                        }
                        ftTextCenter
                      />
                    </form>
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

const mapStateToProps = state => ({
  isAuthenticated: AuthHelper.isAuthenticated(state.auth)
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
