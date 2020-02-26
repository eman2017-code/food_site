import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../actions";
import { Image, Badge, Button, Media } from "react-bootstrap";
import PropTypes from "prop-types";
import Icofont from "react-icofont";
import FavoriteButton from "./FavoriteButton.js";

class QuickBite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 0,
      show: this.props.show || true,
      max: this.props.maxValue || 5,
      min: this.props.minValue || 0
    };
  }

  addToCart = foodItem => {
    this.props.addToCart(foodItem);
  };

  render() {
    const { foodItem, isLoggedIn } = this.props;
    return (
      <div className={"p-3 border-bottom " + this.props.itemClass}>
        {isLoggedIn ? (
          <span className="float-right ml-2">
            <FavoriteButton
              id={this.props.foodId}
              foodAPIKey={this.props.id}
              restaurantAPIKey={this.props.restaurantAPIKey}
              name={this.props.title}
              price={this.props.price}
              description={this.props.description}
            />
          </span>
        ) : (
          ""
        )}

        <span className="float-right">
          <Button
            onClick={() =>
              this.props.showFoodCustomizationModal(this.props.foodItem)
            }
            variant="outline-secondary"
            size="sm"
          >
            ADD
          </Button>
        </span>
        <Media>
          {this.props.image ? (
            <Image
              className={"mr-3 rounded-pill " + this.props.imageClass}
              src={this.props.image}
              alt={this.props.imageAlt}
            />
          ) : (
            <div className="mr-3">
              <Icofont
                icon="ui-press"
                className={"text-" + this.props.badgeVariant + " food-item"}
              />
            </div>
          )}
          <Media.Body>
            <h6 className="mb-1">
              {this.props.title}{" "}
              {this.props.showBadge ? (
                <Badge variant={this.props.badgeVariant}>
                  {this.props.badgeText}
                </Badge>
              ) : (
                ""
              )}
            </h6>
            <p className="text-gray mb-0">
              {this.props.priceUnit}
              {this.props.price}
            </p>
          </Media.Body>
        </Media>
      </div>
    );
  }
}

QuickBite.propTypes = {
  itemClass: PropTypes.string,
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  showBadge: PropTypes.bool,
  badgeVariant: PropTypes.string,
  badgeText: PropTypes.string,
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  id: PropTypes.number.isRequired,
  qty: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  getValue: PropTypes.func.isRequired
};

QuickBite.defaultProps = {
  itemClass: "gold-members",
  imageAlt: "",
  imageClass: "",
  showBadge: false,
  price: "",
  priceUnit: "$",
  showPromoted: false,
  badgeVariant: "danger"
};

const mapStateToProps = state => {
  return {
    cart: state.cartItems.carts,
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps, { addToCart })(QuickBite);
