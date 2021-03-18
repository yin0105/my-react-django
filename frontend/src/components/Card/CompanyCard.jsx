/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";

export class CompanyCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="icon-big text-center icon-warning">
                {this.props.companyImg}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          {/*<hr />*/}
          <div className="stats">
            {this.props.companyName}
            <span className="pull-right">{this.props.statsIcon}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyCard;
