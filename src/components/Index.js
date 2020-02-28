import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel3";
import TopSearch from "./home/TopSearch";
import ProductBox from "./home/ProductBox";
import CardItem from "./common/CardItem";
import SectionHeading from "./common/SectionHeading";
import FontAwesome from "./common/FontAwesome";
import Header from "./common/Header";
import Footer from "./common/Footer";

class Index extends React.Component {
  render() {
    return (
      <>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Header />
        ) : (
          ""
        )}
        <TopSearch />
        <section className="section pt-5 pb-5 bg-white homepage-add-section">
          <Container>
            <Row>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro1.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/2.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro3.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro4.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
          <Container>
            <SectionHeading
              heading="Become a Member"
              subHeading="Order the food you love!"
            />
            <Row>
              <Col sm={12} className="text-center">
                <Link to="register" className="btn btn-success btn-lg">
                  Create an Account <FontAwesome icon="chevron-circle-right" />
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Footer />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Index;
