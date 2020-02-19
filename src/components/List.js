import React from "react";
import { connect } from "react-redux";
import { listRestaurants, setFoodTypeFilters } from "../actions";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Accordion,
  Button,
  Form,
  Spinner
} from "react-bootstrap";
import Icofont from "react-icofont";
import PageTitle from "./common/PageTitle";
import CardItem from "./common/CardItem";
import CategoriesCarousel from "./common/CategoriesCarousel";

class List extends React.Component {

  componentDidMount() {
    this.props.listRestaurants();
  }

  // when a cuisine type checkbox is this function adds it the the filtersReducer
  handleCuisineTypeClicked = (e) => {
    const foodType = e.target.name;
    this.props.setFoodTypeFilters(foodType);
  }

  render() {
    const { restaurants } = this.props;
    return (
      <>
        <PageTitle
          title="Restaurant Listings"
          subTitle="Best deals at your favourite restaurants"
        />
        <section className="section pt-5 pb-5 products-listing">
          <Container>
            <Row className="d-none-m">
              <Col md={12}>
                <Dropdown className="float-right">
                  <Dropdown.Toggle variant="outline-info">
                    Sort by: <span className="text-theme">Distance</span>{" "}
                    &nbsp;&nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right shadow-sm border-0">
                    <Dropdown.Item href="#/distance">Distance</Dropdown.Item>
                    <Dropdown.Item href="#/no-of-coupons">
                      No Of Offers
                    </Dropdown.Item>
                    <Dropdown.Item href="#/rating">Rating</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <small className="h6 mb-0 ml-2">
                  {`${this.props.restaurants.length} Restaurants!`}
                </small>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <div className="filters shadow-sm rounded bg-white mb-4">
                  <div className="filters-header border-bottom pl-4 pr-4 pt-3 pb-3">
                    <h5 className="m-0">Filter By</h5>
                  </div>
                  <div className="filters-body">
                    <Accordion defaultActiveKey="0">
                      <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingOne">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0"
                              eventKey="0"
                            >
                              Location{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>
                        <Accordion.Collapse eventKey="0">
                          <div className="filters-card-body card-shop-filters">
                            <Form.Check
                              custom
                              type="checkbox"
                              defaultChecked={true}
                              id="custom-cb1"
                              label={
                                <React.Fragment>
                                  Ludhiana Junction{" "}
                                  <small className="text-black-50">230</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb2"
                              label={
                                <React.Fragment>
                                  Model Town{" "}
                                  <small className="text-black-50">95</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb3"
                              label={
                                <React.Fragment>
                                  Civil Lines{" "}
                                  <small className="text-black-50">35</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb4"
                              label={
                                <React.Fragment>
                                  Dugri{" "}
                                  <small className="text-black-50">46</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb5"
                              label={
                                <React.Fragment>
                                  PAU{" "}
                                  <small className="text-black-50">20</small>
                                </React.Fragment>
                              }
                            />
                            <div className="mt-2">
                              <Link to="#" className="link">
                                See all
                              </Link>
                            </div>
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingTwo">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0"
                              eventKey="1"
                            >
                              All cuisines{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>
                        
                        {/* --- Food Type Filters --- */}

                        <Accordion.Collapse eventKey="1">
                          <div className="filters-card-body card-shop-filters">
                            <form className="filters-search mb-3">
                              <Form.Group>
                                <Icofont icon="search" />
                                <Form.Control
                                  type="text"
                                  placeholder="Start typing to search..."
                                />
                              </Form.Group>
                            </form>
                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb6"
                              name="American"
                              label="American"
                              onClick={this.handleCuisineTypeClicked}
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb7"
                              label="Pizza"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb8"
                              label="Healthy"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb9"
                              label="Vegetarian"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb10"
                              label="Chinese"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb11"
                              label="Hamburgers"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb12"
                              label="Dessert"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb13"
                              label="Chicken"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb14"
                              label="Indian"
                            />
                            <div className="mt-2">
                              <Link to="#" className="link">
                                See all
                              </Link>
                            </div>
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingOne">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0"
                              eventKey="4"
                            >
                              Category{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>
                        <Accordion.Collapse eventKey="4">
                          <div className="filters-card-body card-shop-filters">
                            <Form.Check
                              custom
                              type="checkbox"
                              defaultChecked={true}
                              id="custom-cb23"
                              label={
                                <React.Fragment>
                                  Delivery{" "}
                                  <small className="text-black-50">156</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb24"
                              label={
                                <React.Fragment>
                                  Dine-out{" "}
                                  <small className="text-black-50">120</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb25"
                              label={
                                <React.Fragment>
                                  Cafés
                                  <small className="text-black-50">85</small>
                                </React.Fragment>
                              }
                            />
                          </div>
                        </Accordion.Collapse>
                      </div>
                    </Accordion>
                  </div>
                </div>
              </Col>
              <Col md={9}>
                <CategoriesCarousel />
                {restaurants.map((restaurant, i) => {
                  return (
                    <div className="grid-container" key={i}>
                      <div className="grid-item">
                        <CardItem
                          apiKey={restaurant.apiKey}
                          title={restaurant.name}
                          subTitle={restaurant.city}
                          imageAlt="Product"
                          image={restaurant.logoUrl}
                          imageClass="img-fluid item-img"
                          offerText="65% off | Use Coupon OSAHAN50"
                          time={`${restaurant.minWaitTime} - ${restaurant.maxWaitTime} minutes`}
                          phoneNumber={restaurant.phone}
                          showPromoted={false}
                          promotedVariant="dark"
                          favIcoIconColor="text-danger"
                        />
                      </div>
                    </div>
                  );
                })}
              </Col>
              <Col md={12} className="text-center load-more">
                <Button variant="primary" type="button" disabled="">
                  <Spinner animation="grow" size="sm" className="mr-1" />
                  Loading...
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { 
    restaurants: state.restaurants.restaurants,
    filters: state.filters
  }
};

export default connect(mapStateToProps, { listRestaurants, setFoodTypeFilters })(List);
