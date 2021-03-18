import React, {Component} from "react";
import {Grid, Row, Col, FormGroup, FormControl, Form} from "react-bootstrap";
import {toastr} from "react-redux-toastr";
import bgImage from "../../assets/img/full-screen-image.jpg";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import ApiHelper from "../../helpers/apiHelper";
import {Redirect} from "react-router";
import {FormFeedback} from "reactstrap"
import logoImage from "../../assets/img/andnowuknow.svg";

class EmailVerificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      email: '',
      code: '',
      errors: {
        email: '',
        code: ''
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

  handleChangeInput = e => {
    let errors = this.state.errors;
    if (errors[e.target.name] !== '') {
      errors[e.target.name] = '';
      this.setState({errors});
    }
    this.setState({[e.target.name]: e.target.value});
  };

  handleVerify = () => {

    let email = localStorage.getItem('email');
    let code = this.state.code;
    let errors = this.state.errors;

    if (code === '') {
      errors.code = 'Verification code is required';
      this.setState({errors});
      return;
    }

    ApiHelper.post('/api/auth/verify_email', {
      code: code,
      email: email
    }, {}, false).then(res => {
      this.props.history.push('/login');
    }).catch(err => {
      toastr.error('Fail!', 'Failed to verify email address');
    });
  };

  handleResend = () => {
    let email = localStorage.getItem('email');

    ApiHelper.post('/api/auth/resend_email', {
      email: email
    }, {}, false).then(res => {
      toastr.success('Success!', 'Please check your email');
    }).catch(err => {
      toastr.error('Fail!', 'Failed to resend email');
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to='/'/>
      );
    }
    let {code, errors} = this.state;

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
                  <Col md={5} sm={6} mdOffset={4} smOffset={3}>
                    <Form horizontal>
                      <Card
                        hidden={this.state.cardHidden}
                        textCenter
                        title={
                          <div>
                            <img src={logoImage} className="logo" alt=""/>
                            <hr />
                            <span>Verify your email address</span>
                          </div>
                        }
                        content={
                          <div>
                            <FormGroup>
                              <Col md={8} mdOffset={2}>
                                <FormControl placeholder="Please enter verification code" type="text" name="code"
                                             value={code} className="text-center" onChange={this.handleChangeInput}/>
                                <FormFeedback className="text-danger">{errors.code}</FormFeedback>
                              </Col>
                            </FormGroup>
                            <FormGroup className="text-center">
                              <Button bsStyle="success" fill wd onClick={this.handleVerify}>
                                Verify
                              </Button>
                            </FormGroup>
                            <FormGroup className="text-center">
                              <span> OR </span>
                            </FormGroup>
                            <FormGroup className="text-center">
                              <span>Don't receive an email? </span>
                              <a onClick={this.handleResend}>Resend email</a>
                            </FormGroup>
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

export default EmailVerificationPage;
