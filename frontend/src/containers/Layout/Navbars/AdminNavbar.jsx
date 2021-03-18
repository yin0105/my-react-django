import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import routes from "../../../routes.js";

class AdminNavbar extends Component {
  getActiveRoute = routes => {
    let activeRoute = "Welcome to Home";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
            window.location.href.indexOf(routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  mobileSidebarToggle = e => {
    document.documentElement.classList.toggle("nav-open");
  };

  render() {
    return (
      <Navbar fluid className={this.props.navbar ? "navbar-fixed" : ""}>
        <div className="navbar-minimize">
          <button
            id="minimizeSidebar"
            className="btn btn-default btn-fill btn-round btn-icon"
            onClick={this.props.handleMiniClick}
          >
            <i className="fa fa-ellipsis-v visible-on-sidebar-regular" />
            <i className="fa fa-navicon visible-on-sidebar-mini" />
          </button>
        </div>
        <Navbar.Header>
          <Navbar.Brand>
            {/* Here we create navbar brand, based on route name */}
            <a href="#pablo" className="navbar-title">{this.getActiveRoute(routes)}</a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default AdminNavbar;
