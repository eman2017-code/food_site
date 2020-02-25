import React from "react";
import { connect } from "react-redux";
import { fetchSingleRestaurant } from "../../actions";
import { Link } from "react-router-dom";
import { Image, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import Icofont from "react-icofont";

class CardItem extends React.Component {
  render() {
    return (
      <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
        <div className="list-card-image">
          {this.props.rating ? (
            <div className="star position-absolute">
              <Badge variant="success">
                <Icofont icon="star" /> {this.props.rating}
              </Badge>
            </div>
          ) : (
            ""
          )}
          <div
            className={`favourite-heart position-absolute ${this.props.favIcoIconColor}`}
          >
            {/* -- include a toast message telling user that they favorited a restaurant */}
            <Icofont icon="heart" />
          </div>
          <Link
            to={`detail/${this.props.apiKey}`}
            onClick={() => {
              this.props.fetchSingleRestaurant(this.props.apiKey);
            }}
          >
            {
              this.props.image ? (
                <Image
                  src={this.props.image}
                  className={this.props.imageClass}
                  alt={this.props.imageAlt} />
              )
              :
              null
            }
          </Link>
        </div>
        <div className="p-3 position-relative">
          <div className="list-card-body">
            <h6 className="mb-1">
              <Link
                to={{
                  pathname: `detail/${this.props.apiKey}`,
                  // pass the apiKey in props
                  state: { apiKey: this.props.apiKey }
                }}
                className="text-black"
              >
                {this.props.title}
              </Link>
            </h6>
            {this.props.subTitle ? (
              <p className="text-gray mb-3">{this.props.subTitle}</p>
            ) : (
              ""
            )}
            {this.props.time || this.props.price ? (
              <p className="text-gray mb-3 time">
                {this.props.time ? (
                  <span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2">
                    <Icofont icon="wall-clock" /> {this.props.time}
                  </span>
                ) : (
                  ""
                )}
                {this.props.price ? (
                  <span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2 ml-2">
                    {this.props.price}
                  </span>
                ) : (
                  ""
                )}
              </p>
            ) : (
              ""
            )}
          </div>
          {this.props.offerText ? (
            <div className="list-card-badge">
              <Badge variant={this.props.offerColor}>OFFER</Badge>{" "}
              <small>{this.props.offerText}</small>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

CardItem.propTypes = {
  apiKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  offerText: PropTypes.string,
  offerColor: PropTypes.string,
  subTitle: PropTypes.string,
  time: PropTypes.string,
  phoneNumber: PropTypes.string,
  showPromoted: PropTypes.bool,
  promotedVariant: PropTypes.string,
  favIcoIconColor: PropTypes.string
};

CardItem.defaultProps = {
  imageAlt: "",
  imageClass: "",
  offerText: "",
  offerColor: "success",
  subTitle: "",
  time: "",
  price: "",
  showPromoted: false,
  promotedVariant: "dark",
  favIcoIconColor: "",
  rating: ""
};

const mapStateToProps = state => {
  return { isLoggedIn: state.user.isLoggedIn };
};
export default connect(mapStateToProps, { fetchSingleRestaurant })(CardItem);
