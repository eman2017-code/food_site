import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { clearCart, getUsersDeliveryAddresses } from "../actions";
import { getCartTotal } from "../services";
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
      // values of the check boxes where the user selects whether they want delivery or pick up
      deliveryCheckbox: false,
      pickupCheckbox: false,

      showAddressModal: false,
      addressSelected: '',

      // credit card payments
      cardNumber: '',
      validDate: '',
      cvv: '',
      cardHolderName: ''
    }
  }

  componentDidMount() {
    this.props.getUsersDeliveryAddresses();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheckboxChange = (e) => {
    this.setState({ 
      deliveryCheckbox: false,
      pickupCheckbox: false,
      [e.target.name]: e.target.checked
    });
  }

  setDeliveryAddress = (address) => {
    this.setState({
      addressSelected: address
    });
  }

  removeDeliveryAddress = () => {
    this.setState({
      addressSelected: ''
    });
  }
  
  // shows the create delivery address modal
  showAddressModal = () => this.setState({ showAddressModal: true });

  // hides the create delivery address modal
  hideAddressModal = () => this.setState({ showAddressModal: false });

  getQty = ({ id, quantity }) => {};


  // makes a request to the EatStreet api to place an order
  placeOrder = (paymentMethod) => {
    const orderObject = {
      restaurant: this.props.restaurant.apiKey,
      items: this.formatCartItemsForOrder(),
      method: this.state.deliveryCheckBox ? 'delivery' : 'pickup',
      payment: paymentMethod,
      test: true,
      tip: 2
    }
    console.log('orderObject:', orderObject);
  }

  // returns an array of the cart items formatted correctly to place the order
  formatCartItemsForOrder = () => {
    const formattedCartItems = this.props.cartItems.map(item => {
      const itemObject = {
        apiKey: item.apiKey,
        customizationChoices: item.customizations.map(customization => {
           return { apiKey: customization.optionApiKey } 
        })
      }  
      return itemObject;
    });

    return formattedCartItems;
  }
  

  render() {
    const { cartItems, restaurant, user, deliveryAddresses, isLoggedIn } = this.props;

    let total = 0
    const getTotalPrice = cartItems => {
      if (cartItems === undefined) {
        return <h1>0</h1>;
      } else {
        cartItems.map(item => {
          total += item.totalPrice;
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
                  <h6>Delivery or Pickup?</h6>
                  <p>* Some restaurants may only offer delivery or pickup</p>

                  <Form>
                    {restaurant.offersDelivery
                    ? (
                      <Form.Check 
                        label="Delivery"
                        name="deliveryCheckbox"
                        checked={this.state.deliveryCheckbox}
                        onChange={this.handleCheckboxChange}
                      />
                    )
                    : (
                      ""
                    )
                    }
                    {restaurant.offersPickup
                    ? (
                      <Form.Check                         
                        label="Pickup"
                        name="pickupCheckbox"
                        checked={this.state.pickupCheckbox}
                        onChange={this.handleCheckboxChange}
                      />
                    )
                    : (
                      ""
                    )
                    }
                    </Form>
                </div>
              {
                this.state.deliveryCheckbox
                ?
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
                      ? deliveryAddresses.map((address, i) => {
                          return (
                          <Col md={6} key={i}>
                            <ChooseAddressCard
                              addressid={address.id}
                              boxclassName="border border-success"
                              title={address.address}
                              icoIcon="briefcase"
                              iconclassName="icofont-3x"
                              address={address.address}
                              setDeliveryAddress={this.setDeliveryAddress}
                              removeDeliveryAddress={this.removeDeliveryAddress}
                              addressSelected={this.state.addressSelected}
                            />
                          </Col>
                          );
                        })
                      : ""}
                  </Row>
                </div>
                :
                ""
              }
                

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

                          {
                            // if the restaurant accepts cards then the card payment method is shown
                            restaurant.acceptsCard
                            ? (
                              <Nav.Link eventKey="first">
                                <Icofont icon="credit-card" /> Credit/Debit Cards
                              </Nav.Link>
                            )
                            :
                            ""
                          }

                          {
                            // if the restaurant accepts cash then the cash payment method is shown
                            restaurant.acceptsCash
                            ? (
                              <Nav.Link eventKey="fifth">
                                <Icofont icon="money" /> Pay on Delivery
                              </Nav.Link>
                            )
                            :
                            ""
                          }
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
                                      placeholder="Enter card number"
                                      name="cardNumber"
                                      value={this.state.cardNumber}
                                      onChange={this.handleChange}
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
                                  <Form.Label>Valid through (MM/YY)</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter valid through (MM/YY)"
                                    name="validDate"
                                    value={this.state.validDate}
                                    onChange={this.handleChange}
                                  />
                                </Form.Group>

                                <Form.Group className="col-md-4">
                                  <Form.Label>CVV</Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter the CVV number"
                                    name="cvv"
                                    value={this.state.cvv}
                                    onChange={this.handleChange}
                                  />
                                </Form.Group>

                                <Form.Group className="col-md-12">
                                  <Form.Label>Name on card</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter the name of your card"
                                    name="cardHolderName"
                                    value={this.state.cardHolderName}
                                    onChange={this.handleChange}
                                  />
                                </Form.Group>

                                <Form.Group className="col-md-12 mb-0">
                                  <Link
                                    to="#"
                                    onClick={() => this.placeOrder('card')}
                                    className="btn btn-success btn-block btn-lg"
                                  >
                                    $
                                    {cartItems === undefined
                                      ? ""
                                      : `$ ${Math.round(100 * total) / 100}`}
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
                                to="#"
                                onClick={() => this.placeOrder('cash')}
                                className="btn btn-success btn-block btn-lg"
                              >
                                $
                                {cartItems === undefined
                                  ? ""
                                  : `$ ${Math.round(100 * total) / 100}`}
                                }
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
                      {isLoggedIn ? (
                        <span>Thank You for Shopping {user.first_name}</span>
                      ) : (
                        <span>Thank You for Shopping Guest</span>
                      )}
                    </h6>
                  </div>
                </div>

                <div className="bg-white rounded shadow-sm text-center mb-2 p-1 pt-2">
                    <h6>
                      {restaurant.name}
                    </h6>
                </div>
                <Button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => this.props.clearCart()}
                >
                  Clear Cart
                </Button>
                {cartItems.length < 1
                  ? // dont show anything
                    ""
                  : // otherwise shows list of cartItems
                    cartItems.map((item, apiKey) => {
                      return (
                        <div
                          className="bg-white rounded shadow-sm mb-2"
                          key={apiKey}
                        >
                          <CheckoutItem
                            item={item}
                            itemName={item.name}
                            price={Number(item.totalPrice)}
                            id={Number(item.apiKey)}
                            show={true}
                            getValue={this.getQty}
                            qty={1}
                            customizations={item.customizations}
                          />
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
                  <hr />
                  <h6 className="font-weight-bold mb-0">
                    TOTAL{" "}
                    <span className="float-right">
                      ${Math.round(100 * total) / 100}
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
    cartItems: state.cartItems.cart,
    restaurant: state.cartItems.restaurant,
    user: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
    deliveryAddresses: state.addresses.deliveryAddresses,
    total: getCartTotal(state.cartItems.cart)
  };
};

export default connect(mapStateToProps, {
  clearCart,
  getUsersDeliveryAddresses
})(Checkout);
