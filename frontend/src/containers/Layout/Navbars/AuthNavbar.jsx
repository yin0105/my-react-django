import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class PagesHeader extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      width: window.innerWidth
    };
  }

  activeRoute(routeName) {
    return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  mobileSidebarToggle(e) {
    document.documentElement.classList.toggle("nav-open");
  }
  updateWidth() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth.bind(this));
  }
  render() {
    return (
      <Navbar
        collapseOnSelect
        inverse
        className="navbar-primary navbar-transparent navbar-absolute"
      >
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to={"/email"} className="nav-link">
              {this.state.width > 429
                ? "AndNowUKnow"
                : "ANUK"}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul className="nav navbar-nav navbar-right">
            <li className={this.activeRoute("login")}>
              <NavLink to={"/login"} className="nav-link">
                <i className="fa fa-drivers-license-o" />
                <p>Login</p>
              </NavLink>
            </li>
            <li className={this.activeRoute("register")}>
              <NavLink to={"/register"} className="nav-link">
                <i className="fa fa-user-circle-o" />
                <p>Register</p>
              </NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default PagesHeader;
