import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromCart, incrementQty, decrementQty } from "../../actions";
import { getCartTotal } from "../../services";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Icofont from "react-icofont";

class CheckoutItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 1,
      show: this.props.show || true,
      max: this.props.maxValue || 5,
      min: this.props.minValue || 0,
      total: 0
    };
  }

  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { item } = this.props;

    return (
      <div className="gold-members p-2 border-bottom">
        <p className="text-gray mb-0 float-right ml-2">
          {this.props.priceUnit}
          {this.props.price * this.state.quantity}
        </p>
        <span className="count-number float-right">
          <Button
            variant="outline-secondary"
            onClick={() => this.props.decrementQty(item.apiKey)}
            className="btn-sm left dec"
          >
            {" "}
            <Icofont icon="minus" />{" "}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => this.props.incrementQty(item, 1)}
            className="btn-sm right inc"
          >
            {" "}
            <Icofont icon="icofont-plus" />{" "}
          </Button>
        </span>
        <div className="media">
          <div className="mr-2">
            <Button className="btn-sm left dec">
              <Icofont
                icon="icofont-delete"
                onClick={() => this.props.removeFromCart(item)}
              />
            </Button>
          </div>
          <div className="media-body">
            <p className="mt-1 mb-0 text-black">{this.props.itemName}</p>

            {
            this.props.customizations.length > 0 
            ?
            this.props.customizations.map((customization, i) => {
              return (
                <small key={i} className="d-block">{customization.selectionName}, ${customization.price}</small>
              )
            })
            :
            ""
            }

          </div>
        </div>
      </div>
    );
  }
}

CheckoutItem.propTypes = {
  itemName: PropTypes.string,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  getValue: PropTypes.func.isRequired,
  customizations: PropTypes.array.isRequired
};

CheckoutItem.defaultProps = {
  show: true,
  priceUnit: "$"
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems.cart,
    total: getCartTotal(state.cartItems.cart)
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  incrementQty,
  decrementQty
})(CheckoutItem);
