import React, { Component } from "react";
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form} from "react-bootstrap";
import {toastr} from "react-redux-toastr";
import bgImage from "../../assets/img/full-screen-image.jpg";
import logoImage from "../../assets/img/andnowuknow.svg"
import FormFeedback from "reactstrap/es/FormFeedback";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import ApiHelper from "../../helpers/apiHelper";
import {validateEmail, validatePassword} from '../../helpers/commonHelper.jsx';
import {selectCompanies, selectRoles} from '../../variables/Variables'
import Select from "react-select";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      company: null,
      role: null,
      errors: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPwd: '',
        company: '',
        role: '',
        title: ''
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

  handleRegister = e => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let firstName = e.target.elements.firstName.value;
    let lastName = e.target.elements.lastName.value;
    let title = e.target.elements.title.value;
    let password = e.target.elements.password.value;
    let confirmPwd = e.target.elements.confirmPwd.value;
    let errors = this.state.errors;

    if (email === '') {
      errors.email = 'Email is required';
      this.setState({errors});
      return;
    }

    if (firstName === '') {
      errors.firstName = 'First name is required';
      this.setState({errors});
      return;
    }

    if (lastName === '') {
      errors.lastName = 'Last name is required';
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

    if (!validatePassword(password)) {
      errors.password = 'Password should be 6-20 characters, which contain at least one numeric digit, ' +
          'one uppercase and one lowercase letter'
      this.setState({errors});
      return;
    }

    if (confirmPwd !== password) {
      errors.confirmPwd = 'Password does not match';
      this.setState({errors});
      return;
    }

    if (this.state.company == null) {
      errors.company = 'Please Select the Company';
      this.setState({errors});
      return;
    }

    if (this.state.role == null) {
      errors.role = 'Please Select the Role';
      this.setState({errors});
      return;
    }

    if (title === '') {
      errors.title = 'Title or Position is required';
      this.setState({errors});
      return;
    }

    localStorage.setItem('email', email)

    ApiHelper.post('/api/auth/register', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      company: this.state.company.label,
      role: this.state.role.label,
      title: title
    }, {}, false).then(res => {
      toastr.success('Success!', 'User was successfully registered and please check your email.');
      this.props.history.push('/login');
    }).catch(err => {
      if (err.response.status === 400){
        toastr.error('Fail!', 'This email has already registered, please login or use another email to signup');
        this.props.history.push('/login')
      }
    });
  };

  handleChangeInput = e => {
    let errors = this.state.errors;
    if (errors[e.target.name] !== '') {
      errors[e.target.name] = '';
      this.setState(errors);
    }
  };

  render() {
    let {errors} = this.state;

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
                    <Form onSubmit={this.handleRegister}>
                      <Card
                        hidden={this.state.cardHidden}
                        textCenter
                        title={
                          <div>
                            <img src={logoImage} className="logo" alt=""/>
                            <hr />
                            <span>Subscribe to AndNowUKnow Fresh Produce Industry News</span>
                          </div>}
                        content={
                          <Row>
                            <Col md={8} mdOffset={2}>
                            <FormGroup>
                              <ControlLabel>Email address<span className="star">*</span></ControlLabel>
                              <FormControl placeholder="Email Address" name="email" type="email"
                                           onChange={this.handleChangeInput}/>
                              <FormFeedback className="text-danger">{errors.email}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>First Name<span className="star">*</span></ControlLabel>
                              <FormControl placeholder="First Name" name="firstName" type="text"
                                           onChange={this.handleChangeInput}/>
                              <FormFeedback className="text-danger">{errors.firstName}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Last Name<span className="star">*</span></ControlLabel>
                              <FormControl placeholder="Last Name" name="lastName" type="text"
                                           onChange={this.handleChangeInput}/>
                              <FormFeedback className="text-danger">{errors.lastName}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Password<span className="star">*</span></ControlLabel>
                              <FormControl placeholder="Password" name="password" type="password" autoComplete="off"
                                           onChange={this.handleChangeInput}/>
                              <FormFeedback className="text-danger">{errors.password}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Password Confirmation<span className="star">*</span></ControlLabel>
                              <FormControl placeholder="Confirm Password" name="confirmPwd" type="password"
                                           autoComplete="off" onChange={this.handleChangeInput}/>
                              <FormFeedback className="text-danger">{errors.confirmPwd}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Company<span className="star">*</span></ControlLabel>
                              <Select
                                name="company"
                                value={this.state.company}
                                options={selectCompanies}
                                placeholder = "- Please Select Company -"
                                onChange={value => this.setState({ company: value })}
                                // onChange={this.handleChangeInput}
                              />
                              <FormFeedback className="text-danger">{errors.company}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Please Describe Your Role<span className="star">*</span></ControlLabel>
                              <Select
                                name="role"
                                value={this.state.role}
                                options={selectRoles}
                                placeholder = "- Please Describe Your Role -"
                                onChange={value => this.setState({role: value})}
                              />
                              <FormFeedback className="text-danger">{errors.role}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Title or Position at Company<span className="star">*</span></ControlLabel>
                              <FormControl placeholder="Title or Position at Company" name="title" type="text"
                                           onChange={this.handleChangeInput}/>
                              <FormFeedback className="text-danger">{errors.title}</FormFeedback>
                            </FormGroup>
                              </Col>
                          </Row>
                        }
                        legend={
                          <div>
                            <Row>
                              <Button bsStyle="success" fill wd type="submit">
                                Sign Up
                              </Button>
                            </Row>
                            <Row>
                              <span>Do you already have an account? </span>
                              <a href="/login">Sign in</a>
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

export default RegisterPage;
