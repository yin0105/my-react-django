import React, { Component } from "react";
import footerLogo from "../../assets/img/footer_logo.svg"
import {Row, Col} from "react-bootstrap"

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Row style={{marginRight: '0px'}}>
          <hr />
        </Row>
        <div className="container">
          <Row>
            <Col md={3}>
              <img src={footerLogo} alt=""/>
              <span className="social-title">Follow us-</span>
              <span className="social-link">
                <a href="https://www.facebook.com/andnowuknow" target="_blank">
                  <i className="fa fa-facebook" />
                </a>
                <a href="https://www.twitter.com/andnowuknow" target="_blank">
                  <i className="fa fa-twitter" />
                </a>
                <a href="https://instagram.com/andnowuknow" target="_blank">
                  <i className="fa fa-instagram" />
                </a>
                <a href="https://www.linkedin.com/company/andnowuknow" target="_blank">
                  <i className="fa fa-linkedin" />
                </a>
                <a href="https://www.youube.com/user/andnowuknow" target="_blank">
                  <i className="fa fa-youtube" />
                </a>
              </span>
              <p>&copy; 2008 - {1900 + new Date().getYear()} <span className="support-title">andnowuknow.com</span></p>
            </Col>
            <Col md={3}>
              <span className="title">News Sections</span>
              <Row className="cat-hr">
                <hr />
              </Row>
              <span className="sub-title">
                <a href={"/home"} >Home<br/></a>
                <a href={"/home"} >Buyside News<br/></a>
                <a href={"/home"} >Behind the Greens<br/></a>
                <a href={"/home"} >Headlines<br/></a>
                <a href={"/home"} >Quick Dish<br/></a>
                <a href={"/home"} >Shop Talk<br/></a>
                <a href={"/home"} >Special Reports<br/></a>
                <a href={"/home"} >The Bloom<br/></a>
                <a href={"/home"} >Product Showcase<br/></a>
                <a href={"/home"} >What's in store<br/></a>
              </span>
              {/*<span className="margin-bottom"></span>*/}
            </Col>
            <Col md={3}>
              <span className="title">Site Maps</span>
              <Row className="cat-hr">
                <hr />
              </Row>
              <span className="sub-title">
                <a href={"/home"} >Fresh Produce Jobs<br/></a>
                <a href={"/home"} >Fresh Produce Categories<br/></a>
                <a href={"/home"} >Fresh Produce Companies<br/></a>
                <a href={"/home"} >Subscribe to our Newsletter<br/></a>
                <a href={"/home"} >Contact our staff<br/></a>
                <a href={"/home"} >Testimonials<br/></a>
                <a href={"/home"} >Terms of Service | Privacy Policy<br/></a>
              </span>
            </Col>
            <Col md={3} className="margin-bottom">
              <span className="title">Contact us</span>
              <Row className="cat-hr">
                <hr />
              </Row>

              <span className="contact-info">
                <a href={"/home"} >
                  <span className="support-title">andnowuknow.com</span><br />
                </a>
                <a href={"/home"} >2005 Capital Ave. Sacramento,<br/></a>
                <a href={"/home"} >CA 95811<br/></a>
                <a href={"/home"} >P: (916) 346-4511<br/></a>
                <hr />
                <a href={"/home"} >Press & Editorial<br/></a>
                <a href={"/home"} >
                  <span className="support-title">pr@andnowuknow.com</span><br />
                </a>
                <a href={"/home"} >P: (916) 346-4511<br/></a>
                <hr />
                <a href={"/home"} >Sales and Advertising<br/></a>
                <a href={"/home"} >
                  <span className="support-title">sales@andnowuknow.com</span><br />
                </a>
                <a href={"/home"} >P: (916) 449-2725<br/></a>
              </span>
            </Col>
          </Row>
        </div>
      </footer>
    );
  }
}
export default Footer;