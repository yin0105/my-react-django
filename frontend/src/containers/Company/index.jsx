import React, { Component } from "react";
import {Grid, Row, Col, FormGroup, FormControl} from "react-bootstrap";
import Pagination from "react-js-pagination";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import HomeNavbar from "../Layout/Navbars/HomeNavbar";
import CompanyCard from "../../components/Card/CompanyCard";
import companyImg from "../../assets/img/company/48forty-solutions_comp_pro_mar_2018.jpg"
import companyImg2 from "../../assets/img/company/4earth-farms_comp_pro_apr_2016.jpg"
import Footer from "../Layout/Footer";
require("bootstrap/less/bootstrap.less");

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      activePage: 3
    };
  }

  handleReset() {
    let name = this.state.name
    this.setState({[name]: ""})
  }

  handleChangeInput = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    const {name} = this.state
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
                      <div className="page-title">
                        <span>Fresh Produce Company Directory</span>
                      </div>
                    }
                    content={
                      <Row>
                        <Col md={10} mdOffset={1} className="margin-top margin-bottom">
                          <FormGroup>
                            <Col md={8}>
                              <FormControl placeholder="Name" name="name" type="name" value={name}
                                           onChange={this.handleChangeInput}/>
                            </Col>
                            <Col md={2}>
                              <Button className="apply-button" fill>
                                Apply
                              </Button>
                            </Col>
                            <Col md={2}>
                              <Button className="reset-button" onClick={this.handleReset}>
                                Reset
                              </Button>
                            </Col>
                          </FormGroup>
                          </Col>
                      </Row>
                    }
                  />
                </Col>
                <Col md={3} sm={3}>
                  <a href={'/company/detail'}>
                    <CompanyCard
                      companyImg={<img src={companyImg}/>}
                      statsIcon={<i className="fa fa-chevron-right" />}
                      companyName="48forty Solutions"
                    />
                  </a>
                </Col>
                <Col md={3} sm={3}>
                  <a href={'/company/detail'}>
                    <CompanyCard
                      companyImg={<img src={companyImg2}/>}
                      statsIcon={<i className="fa fa-chevron-right" />}
                      companyName="4Earth Farms"
                    />
                  </a>
                </Col>
                <Col md={3} sm={3}>
                  <a href={'/company/detail'}>
                    <CompanyCard
                      companyImg={<img src={companyImg}/>}
                      statsIcon={<i className="fa fa-chevron-right" />}
                      companyName="48forty Solutions"
                    />
                  </a>
                </Col>
                <Col md={3} sm={3}>
                  <a href={'/company/detail'}>
                    <CompanyCard
                      companyImg={<img src={companyImg}/>}
                      statsIcon={<i className="fa fa-chevron-right" />}
                      companyName="48forty Solutions"
                    />
                  </a>
                </Col>
                <Col md={3} sm={3}>
                  <a href={'/company/detail'}>
                    <CompanyCard
                      companyImg={<img src={companyImg}/>}
                      statsIcon={<i className="fa fa-chevron-right" />}
                      companyName="48forty Solutions"
                    />
                  </a>
                </Col>
                <Col md={12} className="text-center">
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    prevPageText={<span><i className="fa fa-angle-left"/> Previous</span>}
                    nextPageText={<span>Next <i className="fa fa-angle-right"/></span>}
                    totalItemsCount={50}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
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

export default CompanyPage;
