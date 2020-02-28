import React from "react";
import { connect } from "react-redux";
import {
  clearFoodTypeFilters,
  setFoodTypeFilter,
  removeFoodTypeFilter
} from "../actions";
import { restaurantFilter } from "../filters/restaurantFilter.js";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Accordion,
  Button,
  Form,
  Spinner,
  InputGroup
} from "react-bootstrap";
import Icofont from "react-icofont";
import PageTitle from "./common/PageTitle";
import CardItem from "./common/CardItem";
import CategoriesCarousel from "./common/CategoriesCarousel";
import Header from "./common/Header";
import Footer from "./common/Footer";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      // search results
      filteredResults: [],
      isTyping: false
    };

    this.handleChange = this.handleChange.bind(this);

    // clears any food type filters that may be in the store
    this.props.clearFoodTypeFilters();
  }

  async componentDidMount() {
    // hides loading icon after request to get all restaurants is finished
    this.setState({ isLoading: false });
  }

  // when a cuisine type checkbox is this function adds it the the filtersReducer
  handleCuisineTypeClicked = e => {
    const foodType = e.target.name;

    // if the checkbox is already clicked
    if (this.props.filters.foodTypes.includes(foodType)) {
      this.props.removeFoodTypeFilter(foodType);

      // otherise if the checkbox is not already clicked
    } else {
      this.props.setFoodTypeFilter(foodType);
    }

    // shows the loading icon for 1 second while the restaurants are being filtered
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  };

  handleChange(e) {
    // items reduced to own arrays
    let menuItems = [];

    // list of searched items
    let newList = [];

    // items reduced singular objects
    const allItems = this.props.restaurants;

    // this.props.restaurant.restaurantMenu.map(item => {
    //   const itemObject = item.items;
    //   menuItems.push(itemObject);
    // });
    // menuItems.map(item => {
    //   item.map(singeItem => {
    //     allItems.push(singeItem);
    //   });
    // });

    // if the search bar isn't empty
    if (e.target.value !== "") {
      newList = allItems.filter(item => {
        // change current item to lowercase
        const lc = item.name.toLowerCase();
        // change search term to lowercase
        // elimates issues with search
        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      // if the search bar is empty, set newList to original task list
      newList = allItems;
    }

    this.setState({
      filteredResults: newList,
      isTyping: true
    });
  }

  render() {
    const { restaurants } = this.props;

    return (
      <>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Header />
        ) : (
          ""
        )}
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
                              name="Pizza"
                              label="Pizza"
                              onClick={this.handleCuisineTypeClicked}
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb8"
                              name="Mexican"
                              label="Mexican"
                              onClick={this.handleCuisineTypeClicked}
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb10"
                              name="Chinese"
                              label="Chinese"
                              onClick={this.handleCuisineTypeClicked}
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb11"
                              name="Fast Food"
                              label="Fast Food"
                              onClick={this.handleCuisineTypeClicked}
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb12"
                              name="Dessert"
                              label="Dessert"
                              onClick={this.handleCuisineTypeClicked}
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb9"
                              name="Vegetarian"
                              label="Vegetarian"
                              onClick={this.handleCuisineTypeClicked}
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb14"
                              name="Indian"
                              label="Indian"
                              onClick={this.handleCuisineTypeClicked}
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
                <Form className="explore-outlets-search mb-4">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search for restaurants..."
                      onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                      <Button type="button" variant="link">
                        <Icofont icon="search" />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
                {this.state.isTyping
                  ? this.state.filteredResults.map((result, i) => {
                      return (
                        <CardItem
                          key={i}
                          apiKey={result.apiKey}
                          title={result.name}
                          subTitle={result.city}
                          imageAlt="Product"
                          image={result.logoUrl}
                          imageClass="img-fluid item-img"
                          offerText="65% off | Use Coupon OSAHAN50"
                          time={`${result.minWaitTime} - ${result.maxWaitTime} minutes`}
                          phoneNumber={result.phone}
                          showPromoted={false}
                          promotedVariant="dark"
                          favIcoIconColor="text-danger"
                        />
                      );
                    })
                  : restaurants.map((restaurant, i) => {
                      return (
                        <div className="grid-container" key={i}>
                          <div className="grid-item">
                            <CardItem
                              key={i}
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

const mapStateToProps = state => {
  return {
    restaurants: restaurantFilter(state.restaurants.restaurants, state.filters),
    filters: state.filters
  };
};

export default connect(mapStateToProps, {
  clearFoodTypeFilters,
  setFoodTypeFilter,
  removeFoodTypeFilter
})(List);
