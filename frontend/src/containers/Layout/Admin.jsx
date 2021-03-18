import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {connect} from "react-redux"
import image from "../../assets/img/full-screen-image-3.jpg";
import Sidebar from "./Sidebar.jsx";
import AdminNavbar from "./Navbars/AdminNavbar.jsx";
import {logout, getUserInfo} from '../../redux/actions/auth.jsx';
import routes from "../../routes.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "black",
      hasImage: true,
      navbar: false,
      mini: false,
    };
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
    if (
      window.innerWidth < 993 &&
      e.history.action === "PUSH" &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
  }

  componentWillMount() {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }

  handleMiniClick = () => {
    this.setState({ mini: !this.state.mini });
    document.body.classList.toggle("sidebar-mini");
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.access === "common") {
        return (
          <Route
            exact
            path={prop.path}
            key={key}
            render={routeProps => (
              <prop.component
                {...routeProps}
                // handleClick={this.handleNotificationClick}
              />
            )}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    if(!this.props.user){
      return null
    }

    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
          mini={this.state.mini}
        />
        <div
          className={
            "main-panel" +
            (this.props.location.pathname === "/maps/full-screen-maps"
              ? " main-panel-maps"
              : "")
          }
          ref="mainPanel"
        >
          <AdminNavbar
            {...this.props}
            handleMiniClick={this.handleMiniClick}
            navbar={this.state.navbar}
          />
          <Switch>
            {this.getRoutes(routes)}
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  logout,
  getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
