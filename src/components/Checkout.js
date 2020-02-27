import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import {
  clearCart,
  removeFromCart,
  getUsersDeliveryAddresses
} from "../actions";
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Button,
  Tab,
  Nav,
  Image
} from "react-bootstrap";
import ChooseAddressCard from "./common/ChooseAddressCard";
import CheckoutItem from "./common/CheckoutItem";
import AddAddressModal from "./modals/AddAddressModal";
import Icofont from "react-icofont";
import Header from "./common/Header";
import Footer from "./common/Footer";

class Checkout extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressModal: false,
      addressSelected: {},

    
    };
  }

  showAddressModal = () => this.setState({ showAddressModal: true });
  hideAddressModal = () => this.setState({ showAddressModal: false });


  getQty = ({ id, quantity }) => {};

  componentDidMount() {
    this.props.getUsersDeliveryAddresses();
  }

  render() {
    const { cartItems, user, deliveryAddresses, isLoggedIn } = this.props;

    const getTotalPrice = cartItems => {
      let total = 0;
      if (cartItems === undefined) {
        return <h1>0</h1>;
      } else {
        cartItems.cart.map(item => {
          total += item.basePrice;
        });
        // rounds each number to the nearest 100th
        return Math.round(100 * total) / 100;
      }
    };

    return (
      <section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Header />
        ) : (
          ""
        )}
        <AddAddressModal
          show={this.state.showAddressModal}
          onHide={this.hideAddressModal}
        />
        <Container>
          <Row>
            <Col md={8}>
              <div className="offer-dedicated-body-left">
                <div className="pt-2"></div>
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                  <h4 className="mb-1">Choose a delivery address</h4>
                  <button 
					            type="button" 
					            className="btn btn-primary my-3"
					            onClick={this.showAddressModal}>
						            Add Delivery Address
				            </button>
                  <Row>
                    {isLoggedIn === true
                      ? deliveryAddresses.map(address => {
                          return (
                          <Col md={6}>
                            <ChooseAddressCard
                              key={address.id}
                              boxclassName="border border-success"
                              title={address.address}
                              icoIcon="briefcase"
                              iconclassName="icofont-3x"
                              address={address.address}
                            />
                          </Col>
                          );
                        })
                      : ""}
                  </Row>
                </div>
                <div className="pt-2"></div>
                <div className="bg-white rounded shadow-sm p-4 osahan-payment">
                  <h4 className="mb-1">Choose payment method</h4>
                  <h6 className="mb-3 text-black-50">Credit/Debit Cards</h6>
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                  >
                    <Row>
                      <Col sm={4} className="pr-0">
                        <Nav variant="pills" className="flex-column">
                          <Nav.Link eventKey="first">
                            <Icofont icon="credit-card" /> Credit/Debit Cards
                          </Nav.Link>
                          <Nav.Link eventKey="fifth">
                            <Icofont icon="money" /> Pay on Delivery
                          </Nav.Link>
                        </Nav>
                      </Col>
                      <Col sm={8} className="pl-0">
                        <Tab.Content className="h-100">
                          <Tab.Pane eventKey="first">
                            <h6 className="mb-3 mt-0 mb-3">Add new card</h6>
                            <p>
                              WE ACCEPT{" "}
                              <span className="osahan-card">
                                <Icofont icon="visa-alt" />{" "}
                                <Icofont icon="mastercard-alt" />{" "}
                                <Icofont icon="american-express-alt" />{" "}
                                <Icofont icon="payoneer-alt" />{" "}
                                <Icofont icon="apple-pay-alt" />{" "}
                                <Icofont icon="bank-transfer-alt" />{" "}
                                <Icofont icon="discover-alt" />{" "}
                                <Icofont icon="jcb-alt" />
                              </span>
                            </p>
                            <Form>
                              <div className="form-row">
                                <Form.Group className="col-md-12">
                                  <Form.Label>Card number</Form.Label>
                                  <InputGroup>
                                    <Form.Control
                                      type="number"
                                      placeholder="Card number"
                                    />
                                    <InputGroup.Append>
                                      <Button
                                        variant="outline-secondary"
                                        type="button"
                                        id="button-addon2"
                                      >
                                        <Icofont icon="card" />
                                      </Button>
                                    </InputGroup.Append>
                                  </InputGroup>
                                </Form.Group>
                                <Form.Group className="col-md-8">
                                  <Form.Label>Valid through(MM/YY)</Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter Valid through(MM/YY)"
                                  />
                                </Form.Group>
                                <Form.Group className="col-md-4">
                                  <Form.Label>CVV</Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter CVV Number"
                                  />
                                </Form.Group>
                                <Form.Group className="col-md-12">
                                  <Form.Label>Name on card</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Card number"
                                  />
                                </Form.Group>
                                <Form.Group className="col-md-12 mb-0">
                                  <Link
                                    to="/thanks"
                                    className="btn btn-success btn-block btn-lg"
                                  >
                                    {cartItems === undefined
                                      ? ""
                                      : getTotalPrice(cartItems)}
                                    <Icofont icon="long-arrow-right" />
                                  </Link>
                                </Form.Group>
                              </div>
                            </Form>
                          </Tab.Pane>
                          <Tab.Pane eventKey="fifth">
                            <h6 className="mb-3 mt-0 mb-3">Cash</h6>
                            <p>
                              Please keep exact change handy to help us serve
                              you better
                            </p>
                            <hr />
                            <Form>
                              <Link
                                to="/thanks"
                                className="btn btn-success btn-block btn-lg"
                              >
                                {cartItems === undefined
                                  ? ""
                                  : getTotalPrice(cartItems)}
                                <Icofont icon="long-arrow-right" />
                              </Link>
                            </Form>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                <div className="d-flex mb-4 osahan-cart-item-profile">
                  <Image
                    fluid
                    className="mr-3 rounded-pill"
                    alt="osahan"
                    src="/img/2.jpg"
                  />
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-white">
                      {this.props.user.active ? (
                        <span>Thank You for Shopping {user.first_name}</span>
                      ) : (
                        <span>Thank You for Shopping Guest</span>
                      )}
                    </h6>
                    {/* <p className="mb-0 text-white">
                      <Icofont icon="location-pin" /> 2036 2ND AVE, NEW YORK, NY
                      10029
                    </p> */}
                  </div>
                </div>
                <Button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => this.props.clearCart()}
                >
                  Clear Cart
                </Button>
                {cartItems === undefined
                  ? // dont show anything
                    ""
                  : // otherwise shows list of cartItems
                    cartItems.cart.map((item, apiKey) => {
                      return (
                        <div
                          className="bg-white rounded shadow-sm mb-2"
                          key={apiKey}
                        >
                          <CheckoutItem
                            itemName={item.name}
                            price={Number(item.basePrice)}
                            id={Number(item.apiKey)}
                            qty={1}
                            show={true}
                            getValue={this.getQty}
                          />
                          <button>
                            <Icofont
                              icon="icofont-delete"
                              onClick={() => this.props.removeFromCart(item)}
                            />
                          </button>
                        </div>
                      );
                    })}
                <div className="mb-2 bg-white rounded p-2 clearfix">
                  <InputGroup className="input-group-sm mb-2">
                    <Form.Control type="text" placeholder="Enter promo code" />
                    <InputGroup.Append>
                      <Button
                        variant="primary"
                        type="button"
                        id="button-addon2"
                      >
                        <Icofont icon="sale-discount" /> APPLY
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="mb-2 bg-white rounded p-2 clearfix">
                  {/* <p className="mb-1">
                    Item Total{" "}
                    <span className="float-right text-dark">$3140</span>
                  </p> */}
                  {/* <p className="mb-1 text-success">
                    Total Discount
                    <span className="float-right text-success">$1884</span>
                  </p> */}
                  <hr />
                  <h6 className="font-weight-bold mb-0">
                    TOTAL{" "}
                    <span className="float-right">
                      ${getTotalPrice(cartItems)}
                    </span>
                  </h6>
                </div>
              </div>
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
    );
  }
}

// export default Checkout;
const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    user: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
    deliveryAddresses: state.addresses.deliveryAddresses
  };
};

export default connect(mapStateToProps, {
  clearCart,
  removeFromCart,
  getUsersDeliveryAddresses
})(Checkout);
