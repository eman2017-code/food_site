import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from './FavoriteButton.js';


class FavoriteFoodCard extends React.Component {


    render() {
        return (
            <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                <div className="list-card-body position-relative p-3">
                    <h6 className="mb-1">
                        <Link
                            to={{
                                pathname: `detail/${ this.props.restaurant_api_key }`,

                                // pass the apiKey in props
                                state: { apiKey: this.props.restaurant_api_key }
                            }}
                            className="text-black">
                            {this.props.name}
                        </Link>
                    </h6>
                    {
                        this.props.description ? (
                            <p className="text-gray mb-3">{this.props.description}</p>
                        )
                        : (
                            ""
                        )
                    }
                    <p className="text-gray time mt-2">
                        <span className="bg-light text-dark rounded-sm pb-1 pt-1 pl-2 pr-2 mb-3">
                            {this.props.price}
                        </span>
                    </p>
                    <FavoriteButton 
                        foodAPIKey={this.props.food_item_api_key}  
                        restaurantAPIKey={this.props.restaurant_api_key}
                        name={this.props.title}
                        price={this.props.price}
                        description={this.props.description}
                    />
                </div>
            </div>
        )
    }
} 


export default FavoriteFoodCard;