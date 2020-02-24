import React from "react";
import { connect } from "react-redux";
import { getRestaurantsNearBy } from "../../actions";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import Icofont from "react-icofont";
import OwlCarousel from "react-owl-carousel3";
import ProductBox from "./ProductBox";
import CategoriesCarousel from "../common/CategoriesCarousel";
import { GoogleComponent } from "react-google-location";

class TopSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      formSubmitted: false
    };
  }

  // handles the form submission
  handleSubmit = async e => {
    e.preventDefault();

    // calls the action to get restaurants near the users location
    await this.props.getRestaurantsNearBy(this.state.address.place);

    // this causes the user to be redirected to the restaurant listing page
    this.setState({
      formSubmitted: true
    });
  };

  render() {
    // redirects user to listing page after form submission to show restaurants near by
    if (this.state.formSubmitted) {
      return (
        <Redirect
          to={{
            pathname: "/listing",
            state: { address: this.state.address }
          }}
        />
      );
    }

    return (
      <section className="pt-5 pb-5 homepage-search-block position-relative">
        <div className="banner-overlay"></div>
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={8}>
              <div className="homepage-search-title">
                <h1 className="mb-2 font-weight-normal">
                  <span className="font-weight-bold">Find Awesome Deals</span>{" "}
                  in the US
                </h1>
                <h5 className="mb-5 text-secondary font-weight-normal">
                  Lists of top restaurants, cafes, pubs, and bars in Chicago,
                  based on trends
                </h5>
              </div>
              <div className="homepage-search-form">
                <Form className="form-noborder">
                  <div className="form-row">
                    {/* <Form.Group className="col-lg-7 col-md-7 col-sm-12">
                      <Form.Control
                        value={this.state.address}
                        onChange={this.handleChange}
                        name="address"
                        type="text"
                        placeholder="Enter your delivery location"
                        size="lg"
                      />
                    </Form.Group> */}
                    <div className="col-lg-7 col-md-7 col-sm-12">
                      <GoogleComponent
                        apiKey={API_KEY}
                        language={"en"}
                        country={"country:in|country:us"}
                        coordinates={true}
                        onChange={e => {
                          this.setState({ address: e });
                        }}
                      />
                    </div>
                    <Form.Group className="col-lg-2 col-md-2 col-sm-12">
                      <Button
                        onClick={this.handleSubmit}
                        type="submit"
                        className="btn btn-primary btn-block btn-lg btn-gradient"
                      >
                        Search
                      </Button>
                    </Form.Group>
                  </div>
                </Form>
              </div>
              <h6 className="mt-4 text-shadow font-weight-normal">
                E.g. Beverages, Pizzas, Chinese, Bakery, Indian...
              </h6>
              <CategoriesCarousel />
            </Col>
            <Col md={4}>
              <div className="osahan-slider pl-4 pt-3">
                <OwlCarousel
                  nav
                  loop
                  {...options2}
                  className="homepage-ad owl-theme"
                >
                  <div className="item">
                    <ProductBox
                      image="img/slider.png"
                      imageClass="img-fluid rounded"
                      imageAlt="carousel"
                      linkUrl="listing"
                    />
                  </div>
                  <div className="item">
                    <ProductBox
                      image="img/slider1.png"
                      imageClass="img-fluid rounded"
                      imageAlt="carousel"
                      linkUrl="listing"
                    />
                  </div>
                  <div className="item">
                    <ProductBox
                      image="img/slider.png"
                      imageClass="img-fluid rounded"
                      imageAlt="carousel"
                      linkUrl="listing"
                    />
                  </div>
                </OwlCarousel>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const API_KEY = "AIzaSyCQKneGPIJiepqosbq5Akdh8ziuI5KSGqM";
const options2 = {
  responsive: {
    0: {
      items: 2
    },
    764: {
      items: 2
    },
    765: {
      items: 1
    },
    1200: {
      items: 1
    }
  },
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplaySpeed: 1000,
  dots: false,
  autoplayTimeout: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplayHoverPause: true
};

export default connect(null, { getRestaurantsNearBy })(TopSearch);
