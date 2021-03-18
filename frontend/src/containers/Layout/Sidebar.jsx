import React, { Component } from "react";
import { Collapse } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import PropTypes from "prop-types";
import AdminNavbarLinks from "./Navbars/AdminNavbarLinks.jsx";
import routes from "../../routes.js";
import avatar from "../../assets/img/avatar.jpg";
import logo from "../../assets/img/logo.svg";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getCollapseStates(routes),
      openAvatar: false,
      width: window.innerWidth
    };
  }

  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };

  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }

  createLinks = routes => {
    let userRole = this.props.user ? this.props.user.user_role: "";
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        let st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
          <li
            className={this.getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              <i className={prop.icon} />
              <p>
                {prop.name}
                <b
                  className={
                    this.state[prop.state] ? "caret rotate-180" : "caret"
                  }
                />
              </p>
            </a>
            <Collapse in={this.state[prop.state]}>
              <ul className="nav">{this.createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      if (((prop.access === userRole)||(prop.access === "common"))&&(prop.show === "true")){
        return (
          <li className={this.activeRoute(prop.path)} key={key}>
            <NavLink
              to={prop.path}
              className="nav-link"
              activeClassName="active"
            >
              {prop.icon ? (
                <>
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini">{prop.mini}</span>
                  <span className="sidebar-normal">{prop.name}</span>
                </>
              )}
            </NavLink>
          </li>
        );
      }
    });

  };

  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let userName = this.props.user ?
      (this.props.user.first_name ? this.props.user.first_name + " " + this.props.user.last_name : this.props.user.email)
      : "";
    return (
      <div
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
        {this.props.hasImage ? (
          <div
            className="sidebar-background"
            style={{ backgroundImage: "url(" + this.props.image + ")" }}
          />
        ) : (
          ""
        )}
        <div className="logo">
          <a href="/" target="_blank">
            <img src={logo} alt=""/>
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebarWrapper">
          <div className="user">
            <div className="photo">
              <img src={avatar} alt="Avatar" />
            </div>
            <div className="info">
              <a
                href="#pablo"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ openAvatar: !this.state.openAvatar });
                }}
              >
                <span>
                  {userName}
                  <b
                    className={
                      this.state.openAvatar ? "caret rotate-180" : "caret"
                    }
                  />
                </span>
              </a>
              <Collapse in={this.state.openAvatar}>
                <ul className="nav">
                  <li>
                    <Link to="/admin/my_profile">
                      <span className="sidebar-mini">MP</span>
                      <span className="sidebar-normal">My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/log_out">
                      <span className="sidebar-mini">LO</span>
                      <span className="sidebar-normal" onClick={() => this.props.logout()}>Log out</span>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </div>
          </div>
          <ul className="nav">
            {this.state.width <= 992 ? <AdminNavbarLinks /> : null}
            {this.createLinks(routes)}
          </ul>
        </div>
      </div>
    );
  }
}
Sidebar.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object
};
export default Sidebar;
