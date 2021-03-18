import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logoImage from "../../../assets/img/andnowuknow.svg";
import Button from "../../../components/CustomButton/CustomButton.jsx";

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
                  <i className="fa fa-phone border"/> Call us- (916) 346-4511
                </span>
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <span>
                <i className="fa fa-envelope border"/> Email us- sales@andnowuknow.com
              </span>
            </Navbar.Brand>
            {/*<Navbar.Toggle onClick={this.mobileSidebarToggle} />*/}
          </Navbar.Header>
          <Navbar.Collapse>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <p>Follow us-</p>
              </li>
              <li>
                <a href="https://www.facebook.com/andnowuknow" target="_blank" className="nav-link">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/andnowuknow" target="_blank" className="nav-link">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/andnowuknow" target="_blank" className="nav-link">
                  <i className="fa fa-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/andnowuknow" target="_blank" className="nav-link">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="https://www.youube.com/user/andnowuknow" target="_blank" className="nav-link">
                  <i className="fa fa-youtube" />
                </a>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
        <Navbar className="second-navbar">
          {/*<Col md={12}>*/}
          {/*<Row>*/}
            {/*<div className="second-navbar">*/}
              <div className="navbar-margin">
                <img src={logoImage} className="logo"/>
                {/*<ul className="navbar-right">*/}
                <ul className="nav navbar-nav navbar-right">
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
                </ul>
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
