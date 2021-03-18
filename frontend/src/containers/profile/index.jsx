import React, { Component } from "react";
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form, Tab, Nav, NavItem,} from "react-bootstrap"
import {FormFeedback} from "reactstrap"
import {toastr} from "react-redux-toastr";
import {connect} from "react-redux"
import AuthHelper from "../../helpers/authHelper";
import Button from "../../components/CustomButton/CustomButton.jsx";
import Card from "../../components/Card/Card.jsx";
import {GET_USER_INFO_SUCCESS} from '../../redux/actions/auth';
import {validateEmail, validatePassword} from '../../helpers/commonHelper';
import UserCard from "components/Card/UserCard.jsx";
import avatar from "../../assets/img/default-avatar.png";
import Checkbox from "../../components/CustomCheckbox/CustomCheckbox.jsx";
import ApiHelper from "../../helpers/apiHelper";
import GoogleSocialAuth from "../../components/SocialAuth/Google";
// import Avatar from "react-avatar-edit";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "owner",
      email: this.props.user.email,
      firstName: this.props.user.first_name,
      lastName: this.props.user.last_name,
      company: this.props.user.company,
      title: this.props.user.title,
      description: '',
      currentPwd: '',
      newPwd: '',
      confirmPwd: '',
      errors: {
        email: '',
        firstName: '',
        lastName: '',
        title: '',
        description: '',
        currentPwd: '',
        newPwd: '',
        confirmPwd: '',
      }
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
  }

  onClose() {
    this.setState({preview: null})
  }

  onCrop(preview) {
    this.setState({preview})
  }

  onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 71680000){
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  handleCheckbox = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  handleChangeInput = e => {
    let errors = this.state.errors;
    if (errors[e.target.name] !== '') {
      errors[e.target.name] = '';
      this.setState({errors});
    }
    this.setState({[e.target.name]: e.target.value});
  };

  updateProfile = e => {
    e.preventDefault();
    let errors = this.state.errors;

    if (this.state.email === '') {
      errors.email = 'Email is required.';
      this.setState({errors});
      return;
    }

    if (!validateEmail(this.state.email)) {
      errors.email = 'Email is invalid.';
      this.setState({errors});
      return;
    }

    if (this.state.firstName === '') {
      errors.firstName = 'First name is required.';
      this.setState({errors});
      return;
    }

    if (this.state.lastName === '') {
      errors.lastName = 'Last name is required.';
      this.setState({errors});
      return;
    }

    if (this.state.title === '') {
      errors.title = 'Title or Position is required.';
      this.setState({errors});
      return;
    }

    AuthHelper.updateProfile({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      title: this.state.title,
      email: this.state.email,
    }).then(res => {
      this.props.updateProfile(res.data);
      toastr.success('Success!', 'Profile was successfully updated.');
    }).catch(err => {
      let errors = this.state.errors;
      let data = err.response.data;
      for(let key in data) {
        errors[key] = data[key][0];
        this.setState({errors});
      }
    });
  }

  handleRequest = e => {
    e.preventDefault()

    if (this.state.description === '') {
      let errors = this.state.errors;
      errors.description = 'Description is required.';
      this.setState({errors});
      return;
    }

    ApiHelper.put('/api/user', {
      role: this.state.checked,
      description: this.state.description
    }).then(res => {
      toastr.success('Success', 'Your request has been sent successfully.')
    }).catch(err => {
      toastr.error('Failed!', 'Your request was failed to send.')
    })
  }

  changePassword = e => {
    e.preventDefault()
    let errors = this.state.errors;

    if (this.state.currentPwd === '') {
      errors.currentPwd = 'Current password is required.';
      this.setState({errors});
      return;
    }

    if (this.state.newPwd === '') {
      errors.newPwd = 'Password is required.';
      this.setState({errors});
      return;
    }

    if (!validatePassword(this.state.newPwd)) {
      errors.password = 'Password should be 6-20 characters, which contain at least one numeric digit, ' +
        'one uppercase and one lowercase letter'
      this.setState({errors});
      return;
    }

    if (this.state.newPwd !== this.state.confirmPwd ) {
      errors.confirmPwd = 'Password does not match.';
      this.setState({errors});
      return;
    }

    ApiHelper.post('/api/auth/user/change_password', {
      email: this.props.user.email,
      current_password: this.state.currentPwd,
      new_password: this.state.newPwd
    }, {},  false).then(res => {
      toastr.success('Success!', 'Password was successfully changed.');
    }).catch(err => {
      toastr.error('Fail!', 'Current password is invalid');
    })
  }

  render() {
    const {
      errors,
      email,
      firstName,
      lastName,
      company,
      title,
      description,
      currentPwd,
      newPwd,
      confirmPwd
    } = this.state

    if (!this.props.user){
      return null
    }

    const accountPage = (
      <Tab.Container id="nav-with-icons" defaultActiveKey="description">
        <div >
          <div className="nav-container">
            <Nav bsStyle="tabs" bsClass="nav nav-icons">
              <NavItem eventKey="description">
                Profile
              </NavItem>
              <NavItem eventKey="location">
                Account
              </NavItem>
            </Nav>
            <hr />
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="description">
              <Row>
                {/*<Col md={12}>*/}
                  {/*<Avatar*/}
                  {/*  width={390}*/}
                  {/*  height={295}*/}
                  {/*  onCrop={this.onCrop}*/}
                  {/*  onClose={this.onClose}*/}
                  {/*  onBeforeFileLoad={this.onBeforeFileLoad}*/}
                  {/*  src={this.state.src}*/}
                  {/*/>*/}
                  {/*<img src={this.state.preview} alt="Preview" />*/}
                {/*</Col>*/}
                <Col md={6}>
                  <FormGroup>
                    <ControlLabel>Company (Disabled)</ControlLabel>
                    <FormControl placeholder="Company" type="text" name="company" value={company} disabled
                                 onChange={this.handleChangeInput}/>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>First Name<span className="star">*</span></ControlLabel>
                    <FormControl placeholder="First Name" type="text" name="firstName" value={firstName}
                                 onChange={this.handleChangeInput}/>
                    <FormFeedback className="text-danger">{errors.firstName}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <ControlLabel>Email<span className="star">*</span></ControlLabel>
                    <FormControl placeholder="Email" type="email" name="email" value={email}
                                 onChange={this.handleChangeInput}/>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Last Name<span className="star">*</span></ControlLabel>
                    <FormControl placeholder="Last Name" type="text" name="lastName" value={lastName}
                                 onChange={this.handleChangeInput}/>
                    <FormFeedback className="text-danger">{errors.lastName}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <ControlLabel>Title/Position<span className="star">*</span></ControlLabel>
                    <FormControl placeholder="Title/Position" type="text" name="title" value={title}
                                 onChange={this.handleChangeInput}/>
                    <FormFeedback className="text-danger">{errors.title}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Button bsStyle="info" pullRight fill onClick={this.updateProfile}>
                      Update Profile
                    </Button>
                  </FormGroup>
                  <hr />
                  <span className="title">Request to be company owner or representative</span>
                  <Col md={12}>
                    <Row>
                      <Col md={3}>
                        <Checkbox
                          number="1"
                          option="owner"
                          name="checked"
                          onChange={this.handleCheckbox}
                          checked={this.state.checked === "owner"}
                          label="Owner"
                        />
                      </Col>
                      <Col md={3}>
                        <Checkbox
                          number="2"
                          option="representative"
                          name="checked"
                          onChange={this.handleCheckbox}
                          checked={this.state.checked === "representative"}
                          label="Representative"
                        />
                      </Col>
                    </Row>
                    <FormGroup>
                      <ControlLabel>
                        * Your account email should be matched to your company domain for a company ownership. Please update it.
                      </ControlLabel>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Description<span className="star">*</span></ControlLabel>
                      <FormControl placeholder="Description" componentClass="textarea" rows={5} name="description"
                                   value={description} onChange={this.handleChangeInput}/>
                      <FormFeedback className="text-danger">{errors.description}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Button bsStyle="info" pullRight fill onClick={this.handleRequest}>
                        Request
                      </Button>
                    </FormGroup>
                  </Col>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="location">
              <Row>
                <Col md={12}>
                  <span className="title">Connected Service</span>
                </Col>
                <Col md={8} mdOffset={2} className="connected-service">
                  <FormGroup>
                    <span className="col-md-8 social-title">
                      Sign into AndNowUKnow with 1-click <br />
                      You are not signed in through Google
                    </span>
                    <Col md={4}>
                      <GoogleSocialAuth />
                      {/*<Button wd fill google >*/}
                      {/*  <i className="fa fa-google" /> Login with Google*/}
                      {/*</Button>*/}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <span className="col-md-8 social-title">
                      Sign into AndNowUKnow with 1-click <br />
                      You are not signed in through LinkedIn
                    </span>
                    <Col md={4}>
                      <Button wd fill linkedin>
                        <i className="fa fa-linkedin" /> Login with Linkedin
                      </Button>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <span className="col-md-8 social-title">
                      Sign into AndNowUKnow with 1-click <br />
                      You are not signed in through Microsoft
                    </span>
                    <Col md={4}>
                      <Button wd fill behance>
                        <i className="fa fa-windows" /> Login with Microsoft
                      </Button>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <hr />
                  <span className="title">Change Password</span>
                </Col>
                  <Row>
                    <Col md={8} mdOffset={2}>
                      <FormGroup>
                        <ControlLabel>Current Password<span className="star">*</span></ControlLabel>
                        <FormControl placeholder="Current Password" type="password" name="currentPwd"
                                     value={currentPwd} onChange={this.handleChangeInput}/>
                        <FormFeedback className="text-danger">{errors.currentPwd}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>New Password<span className="star">*</span></ControlLabel>
                        <FormControl placeholder="New Password" type="password" name="newPwd"
                                     value={newPwd} onChange={this.handleChangeInput}/>
                        <FormFeedback className="text-danger">{errors.newPwd}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Confirm Password<span className="star">*</span></ControlLabel>
                        <FormControl placeholder="Confirm Password" type="password" name="confirmPwd"
                                     value={confirmPwd} onChange={this.handleChangeInput}/>
                        <FormFeedback className="text-danger">{errors.confirmPwd}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Button bsStyle="info" pullRight fill onClick={this.changePassword}>
                          Change Password
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                {/*</Col>*/}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    )

    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Form horizontal>
                <Card
                  title={
                    <span>My Profile Settings</span>
                  }
                  content={
                    <Row>
                      <Col md={12}>
                        {accountPage}
                      </Col>
                    </Row>
                  }
                />
              </Form>
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name={this.props.user.first_name + ' ' + this.props.user.last_name}
                description={
                  <span>
                    Supermavens Inc
                  </span>
                }
                role={this.props.user.role}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  updateProfile: payload => {
    return {
      type: GET_USER_INFO_SUCCESS,
      payload
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
