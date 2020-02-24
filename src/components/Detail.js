import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleRestaurantMenu } from "../actions";
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Button,
  Tab,
  Nav,
  Image,
  Badge
} from "react-bootstrap";
import ItemsCarousel from "./common/ItemsCarousel";
import QuickBite from "./common/QuickBite";
import Icofont from "react-icofont";
import Header from "./common/Header";
import Checkout from "./Checkout";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressModal: false,
      restaurant_api_key: this.props.match.params.restaurant_api_key,
      lat: props.restaurant.restaurant.latitude,
      lon: props.restaurant.restaurant.longitude
    };
  }

  hideAddressModal = () => this.setState({ showAddressModal: false });
  getQty = ({ id, quantity }) => {};
  getStarValue = ({ value }) => {
    console.log(value);
  };

  componentDidMount() {
    this.props.fetchSingleRestaurantMenu(this.state.restaurant_api_key);
  }

  render() {
    const { restaurant } = this.props.restaurant;
    const restaurantMenu = this.props.restaurant.restaurantMenu;

    let menuItems = [];
    const allItems = [];
    restaurantMenu.map(item => {
      const itemObject = item.items;
      menuItems.push(itemObject);
    });
    menuItems.map(item => {
      item.map(singeItem => {
        allItems.push(singeItem);
      });
    });

    return (
      <>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Header />
        ) : (
          ""
        )}
        <section className="restaurant-detailed-banner">
          <div className="text-center">
            <Image
              fluid
              className="cover"
              src={"/img/mall-dedicated-banner.png"}
            />
          </div>
          <div className="restaurant-detailed-header">
            <Container>
              <Row className="d-flex align-items-end">
                <Col md={8}>
                  <div className="restaurant-detailed-header-left">
                    <Image
                      fluid
                      className="mr-3 float-left"
                      alt="osahan"
                      src={restaurant.logoUrl}
                    />
                    <h2 className="text-white">{restaurant.name}</h2>
                    <p className="text-white mb-1">
                      <Icofont icon="location-pin" /> {restaurant.streetAddress}{" "}
                      <Badge variant="success">OPEN</Badge>
                    </p>
                    <p className="text-white mb-0">
                      <Icofont icon="food-cart" /> {restaurant.foodTypes}
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="restaurant-detailed-header-right text-right">
                    <Button variant="success" type="button">
                      <Icofont icon="clock-time" />
                      {`${restaurant.minWaitTime} - ${restaurant.maxWaitTime} minutes`}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>

        <Tab.Container defaultActiveKey="first">
          <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
            <Container>
              <Row>
                <Col md={12}>
                  <span className="restaurant-detailed-action-btn float-right">
                    <Button
                      variant="light"
                      size="sm"
                      className="border-light-btn mr-1"
                      type="button"
                    >
                      <Icofont icon="heart" className="text-danger" /> Mark as
                      Favourite
                    </Button>
                    <Button variant="outline-danger" size="sm" type="button">
                      <Icofont icon="sale-discount" /> OFFERS
                    </Button>
                  </span>
                  <Nav id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Order Online</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Restaurant Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Book A Table</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
            <Container>
              <Row>
                <Col md={8}>
                  <div className="offer-dedicated-body-left">
                    <Tab.Content className="h-100">
                      <Tab.Pane eventKey="first">
                        <h5 className="mb-4">Recommended</h5>
                        <Form className="explore-outlets-search mb-4">
                          <InputGroup>
                            <Form.Control
                              type="text"
                              placeholder="Search for dishes..."
                            />
                            <InputGroup.Append>
                              <Button type="button" variant="link">
                                <Icofont icon="search" />
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form>
                        <h6 className="mb-3">
                          Most Popular{" "}
                          <Badge variant="success">
                            {" "}
                            <Icofont icon="tags" /> 15% Off All Items{" "}
                          </Badge>
                        </h6>
                        <ItemsCarousel />

                        <Row>
                          <h5 className="mb-4 mt-3 col-md-12">
                            Food Options -
                            <small className="h6 text-black-50">
                              {allItems.length}
                            </small>
                          </h5>

                          <Col md={12}>
                            {allItems.map((foodItem, i) => {
                              return (
                                <div
                                  className="bg-white rounded border shadow-sm mb-4"
                                  key={i}
                                >
                                  <QuickBite
                                    id={Number(foodItem.apiKey)}
                                    title={foodItem.name}
                                    price={foodItem.basePrice}
                                    description={foodItem.description}
                                    getValue={this.getQty}
                                  />
                                </div>
                              );
                            })}
                          </Col>
                        </Row>
                        <Row></Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div
                          id="restaurant-info"
                          className="bg-white rounded shadow-sm p-4 mb-4"
                        >
                          <div className="address-map float-right ml-5">
                            <div className="mapouter">
                              <div className="gmap_canvas">
                                <h5 className="mb-4">Restaurant Info</h5>
                                <p className="mb-2 text-black">
                                  <Icofont icon="phone-circle text-primary mr-2" />{" "}
                                  {restaurant.phone}
                                </p>
                                <p className="mb-2 text-black">
                                  <Icofont icon="clock-time text-primary mr-2" />{" "}
                                  Today 11am – 5pm, 6pm – 11pm
                                  <Badge variant="success" className="ml-1">
                                    {" "}
                                    OPEN NOW{" "}
                                  </Badge>
                                </p>
                                <hr className="clearfix" />
                                <hr className="clearfix" />
                                <Map
                                  google={this.props.google}
                                  zoom={14}
                                  style={style}
                                  initialCenter={{
                                    lat: this.state.lat,
                                    lng: this.state.lon
                                  }}
                                  position="relative"
                                >
                                  <Marker
                                    onClick={this.onMarkerClick}
                                    name={"Current location"}
                                  />
                                </Map>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <div
                          id="book-a-table"
                          className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
                        >
                          <h5 className="mb-4">Book A Table</h5>
                          <Form>
                            <Row>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Full Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Full Name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Email Address</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Email address"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Mobile number</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Mobile number"
                                  />
                                </Form.Group>
                              </Col>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Date And Time</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Date And Time"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Form.Group className="text-right">
                              <Button variant="primary" type="button">
                                {" "}
                                Submit{" "}
                              </Button>
                            </Form.Group>
                          </Form>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
                    <Image
                      fluid
                      className="float-left mr-3"
                      src="/img/earn-score-icon.png"
                    />
                    <h6 className="pt-0 text-primary mb-1 font-weight-bold">
                      OFFER
                    </h6>
                    <p className="mb-0">
                      60% off on orders above $99 | Use coupon{" "}
                      <span className="text-danger font-weight-bold">
                        OSAHAN50
                      </span>
                    </p>
                    <div className="icon-overlap">
                      <Icofont icon="sale-discount" />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Tab.Container>
      </>
    );
  }
}

const style = {
  width: "100%",
  height: "100%"
};

const mapStateToProps = state => {
  return {
    restaurant: state.restaurants
  };
};

export default connect(mapStateToProps, { fetchSingleRestaurantMenu })(
  GoogleApiWrapper({ apiKey: "AIzaSyAwys_T011D2gi6mub7ycQsfYKXHoh5HGA" })(
    Detail
  )
);
