import React, { Component } from "react";
import {
  Navbar,
  FormGroup,
  FormControl,
  InputGroup
} from "react-bootstrap";

class HeaderLinks extends Component {
  render() {
    return (
      <div>
        <Navbar.Form pullLeft className="navbar-search-form">
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <i className="fa fa-search" />
              </InputGroup.Addon>
              <FormControl type="text" placeholder="Search..." />
            </InputGroup>
          </FormGroup>
        </Navbar.Form>
      </div>
    );
  }
}

export default HeaderLinks;
