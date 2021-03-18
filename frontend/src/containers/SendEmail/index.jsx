import React, {Component} from "react"
import {Grid, Row, Col, Form} from "react-bootstrap"
import {connect} from "react-redux"
import Card from "../../components/Card/Card.jsx"
import {getUserInfo} from '../../redux/actions/auth'


class Company extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      title: '',
      message: '',
      errors: {
        name: '',
        email: '',
        title: '',
        message: ''
      }
    }
  }

  handleChangeInput = e => {
    let errors = this.state.errors;
    if (errors[e.target.name] !== '') {
      errors[e.target.name] = '';
      this.setState({errors});
    }
    this.setState({[e.target.name]: e.target.value});
  };

  render(){

    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Form horizontal>
                <Card
                  title="Company"
                />
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
