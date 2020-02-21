import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import PageTitle from "./common/PageTitle";
import CouponCard from "./common/CouponCard";
import Header from "./common/Header";
import Footer from "./common/Footer";

class Offers extends React.Component {
  render() {
    return (
      <>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Header />
        ) : (
          ""
        )}
        <PageTitle
          title="Offers for you"
          subTitle="Explore top deals and offers exclusively for you!"
        />
        <section className="section pt-5 pb-5">
          <Container>
            <Row>
              <Col md={12}>
                <h4 className="font-weight-bold mt-0 mb-3">
                  Available Coupons
                </h4>
              </Col>
              <Col md={4}>
                <CouponCard
                  title="Get 50% OFF on your first osahan eat order"
                  logoImage="img/bank/1.png"
                  subTitle="Use code OSAHANEAT50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200"
                  copyBtnText="COPY CODE"
                  couponCode="OSAHANEAT50"
                />
              </Col>
              <Col md={4}>
                <CouponCard
                  title="Get 50% OFF on your first osahan eat order"
                  logoImage="img/bank/2.png"
                  subTitle="Use code EAT730 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $600"
                  copyBtnText="COPY CODE"
                  couponCode="EAT730"
                />
              </Col>
              <Col md={4}>
                <CouponCard
                  title="Get 50% OFF on your first osahan eat order"
                  logoImage="img/bank/3.png"
                  subTitle="Use code SAHAN50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200"
                  copyBtnText="COPY CODE"
                  couponCode="SAHAN50"
                />
              </Col>
              <Col md={4}>
                <CouponCard
                  title="Get 50% OFF on your first osahan eat order"
                  logoImage="img/bank/4.png"
                  subTitle="Use code GURDEEP50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $600"
                  copyBtnText="COPY CODE"
                  couponCode="GURDEEP50"
                />
              </Col>
              <Col md={4}>
                <CouponCard
                  title="Get 50% OFF on your first osahan eat order"
                  logoImage="img/bank/5.png"
                  subTitle="Use code OSAHANEAT50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200"
                  copyBtnText="COPY CODE"
                  couponCode="OSAHANEAT50"
                />
              </Col>
              <Col md={4}>
                <CouponCard
                  title="Get 50% OFF on your first osahan eat order"
                  logoImage="img/bank/6.png"
                  subTitle="Use code OSAHANEAT50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200"
                  copyBtnText="COPY CODE"
                  couponCode="OSAHANEAT50"
                />
              </Col>
            </Row>
          </Container>
          {this.props.location.pathname !== "/login" &&
          this.props.location.pathname !== "/register" ? (
            <Footer />
          ) : (
            ""
          )}
        </section>
      </>
    );
  }
}

export default Offers;
