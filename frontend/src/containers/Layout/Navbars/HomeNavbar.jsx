import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logoImage from "../../../assets/img/andnowuknow.svg";
import Button from "../../../components/CustomButton/CustomButton.jsx";
import BootstrapNavbar from "./BootstrapNavbar.jsx";
import Burger from './Burger';
import styled from 'styled-components';



import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl,
  InputGroup
} from "react-bootstrap";

const Nav_2 = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 0px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
`

class HomeNavbar extends Component {
  constructor(props) {
    super(props);
    // this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      width: window.innerWidth
    };
  }

  // activeRoute(routeName) {
  //   return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // }

  // mobileSidebarToggle(e) {
  //   document.documentElement.classList.toggle("nav-open");
  // }
  updateWidth() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth.bind(this));
  }
  render() {
    return (
      <div>
        <Navbar className="navbar-default navbar-absolute">
          <Navbar.Header>
            <Navbar.Brand>
              <div className="navbar-nav">
                <span>
                  <i className="fa fa-phone border"/> <span className="m-hidden"> Call us- (916) 346-4511</span>
                </span>
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <span>
                <i className="fa fa-envelope border"/> <span className="m-hidden">Email us- sales@andnowuknow.com</span>
              </span>              
            </Navbar.Brand>
            <div id="header-right">
              <Navbar.Brand>
                <span className="m-hidden">
                  <p>Follow us-</p>
                </span>
              </Navbar.Brand>
              <Navbar.Brand>
                <span>
                  <a href="https://www.facebook.com/andnowuknow" target="_blank" className="nav-link">
                    <i className="fa fa-facebook" />
                  </a>
                </span>
              </Navbar.Brand>
              <Navbar.Brand>
                <span>
                  <a href="https://www.twitter.com/andnowuknow" target="_blank" className="nav-link">
                    <i className="fa fa-twitter" />
                  </a>
                </span>
              </Navbar.Brand>
              <Navbar.Brand>
                <span>
                  <a href="https://instagram.com/andnowuknow" target="_blank" className="nav-link">
                    <i className="fa fa-instagram" />
                  </a>
                </span>
              </Navbar.Brand>
              <Navbar.Brand>
                <span>
                  <a href="https://www.linkedin.com/company/andnowuknow" target="_blank" className="nav-link">
                    <i className="fa fa-linkedin" />
                  </a>
                </span>
              </Navbar.Brand>
              <Navbar.Brand>
                <span>
                  <a href="https://www.youube.com/user/andnowuknow" target="_blank" className="nav-link">
                    <i className="fa fa-youtube" />
                  </a>
                </span>
              </Navbar.Brand>
            </div>
            {/* <BootstrapNavbar/> */}
            {/*<Navbar.Toggle onClick={this.mobileSidebarToggle} />*/}
          </Navbar.Header>
        </Navbar>


        <Navbar className="second-navbar">
          {/*<Col md={12}>*/}
          {/*<Row>*/}
            {/*<div className="second-navbar">*/}
              <div className="navbar-margin">
                <img src={logoImage} className="logo"/>
                {/*<ul className="navbar-right">*/}

                <Nav_2>
                  <div className="logo">
                  </div>
                  <Burger />
                </Nav_2>
              
                {/* <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href={"/login"}>
                      <span className="navbar-name">News</span>
                    </a>
                  </li>
                  <li>
                    <NavLink to={"/login"}>
                      <span className="navbar-name">Categories</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/login"}>
                      <span className="navbar-name">Companies</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/login"}>
                      <span className="navbar-name">Jobs</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/login"}>
                      <span className="navbar-name">Search</span>
                    </NavLink>
                  </li>
                  <li>
                    <a href={"/login"}>
                      <span className="navbar-name">Contact us</span>
                    </a>
                  </li>
                  <li className="btn-padding">
                    <a href={"/login"}>
                      <Button bsStyle="success" fill >Join now</Button>
                    </a>
                  </li>
                </ul> */}
              {/*</div>*/}
            </div>
          {/*</Col>*/}
        {/*</Row>*/}
        </Navbar>
      </div>
    );
  }
}

export default HomeNavbar;
