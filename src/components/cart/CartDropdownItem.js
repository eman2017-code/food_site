import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icofont from "react-icofont";

class CartDropdownItem extends React.Component {
  render() {
    console.log("this.props in CartDropdownItem:", this.props);
    return (
      <p className="mb-2">
        <Icofont
          icon={this.props.icoIcon}
          className={"mr-1 " + this.props.iconClass}
        />
        {this.props.cartItems.name}
        <span className="float-right text-secondary">
          {` $ ${this.props.cartItems.basePrice}`}
        </span>
      </p>
    );
  }
}

CartDropdownItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  icoIcon: PropTypes.string.isRequired,
  iconclass: PropTypes.string.isRequired
};

CartDropdownItem.defaultProps = {
  title: "",
  price: "",
  icoIcon: "",
  iconclass: ""
};

// export default CartDropdownItem;
const mapStateToProps = state => {
  console.log("state in CartDropdownItem:", state);
  return {
    cartItems: state.cartItems.cart
  };
};

export default connect(mapStateToProps)(CartDropdownItem);
