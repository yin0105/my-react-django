import React, { Component } from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import HomeNavbar from "../Layout/Navbars/HomeNavbar";
import companyImg from "../../assets/img/company/48forty-solutions_comp_pro_mar_2018.jpg"
import companyImg2 from "../../assets/img/company/4earth-farms_comp_pro_apr_2016.jpg"
import Footer from "../Layout/Footer";

class CompanyDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleReset() {
    let name = this.state.name
    this.setState({[name]: ""})
  }

  handleChangeInput = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    return (
      <div>
        <HomeNavbar />
        <div className="wrapper wrapper-full-page">
          <div className="content">
            <Grid>
              <Row>
                <Col md={12} sm={12}>
                  <Card
                    textCenter
                    title={
                      <div className="company-title">
                        <span>Abbott & Cobb</span>
                      </div>
                    }
                    content={
                      <Row>
                        <Col md={4} className="text-center">
                          <img src={companyImg} alt=""/><br/>
                          <Button className="apply-button margin-top" fill>
                            Abbott & Cobb <i className="fa fa-external-link pull-right" />
                          </Button><br/>
                          <div className="margin-top">
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
                          </div>
                        </Col>
                        <Col md={8} className="margin-top">
                          <p>As the largest independent breeder, producer, and marketer of vegetable seed since 1917,
                            Abbott & Cobb, Inc. serves the needs of the commercial grower, distributor, retailer,
                            fresh market, fresh-cut, and food services industries, and ultimately, the consumer.
                            Through experience, innovation, and initiative, we deliver vegetable seed varieties
                            that consistently exceed the expectations of our most demanding customers.
                            With facilities throughout the United States, Mexico, Europe, Central and South America,
                            Abbott & Cobb, Inc. remains committed to establishing new standards of quality that will
                            lead the industry.</p>
                        </Col>
                      </Row>
                    }
                  />
                </Col>
                <Col md={12}>
                  <Card
                    title={
                      <div className="company-title">
                        <legend>Categories</legend>
                      </div>
                    }
                    content={
                      <Row>
                        <Col md={2}>
                          <img src={companyImg} alt=""/>
                        </Col>
                        <Col md={2}>
                          <img src={companyImg2} alt=""/>
                        </Col>
                        <Col md={12}>
                          <hr />
                          <span className="category-news">
                            Ahold Delhaize Banner Albert Heijn Acquires FoodFirst Network
                          </span>
                          <hr />
                          <span className="category-news">
                            Bayer CropScience Makes A New Acquisition
                          </span>
                        </Col>
                      </Row>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CompanyDetailPage;
