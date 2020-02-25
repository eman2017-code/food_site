import React from "react";
import { connect } from "react-redux";
import { addFavoriteFood } from "../../actions";
import Icofont from "react-icofont";


class FavoriteButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFavorited: false,
        }
    }

    // favorites this food
    favoriteFood = async () => {
        // formats the food correctly for the api call
        const foodToAdd = {
            restaurant_api_key: this.props.restaurantAPIKey,
            food_item_api_key: this.props.foodAPIKey,
            name: this.props.name,
            description: this.props.description,
            price: this.props.price,
        }

        await this.props.addFavoriteFood(foodToAdd);

        this.setState({
            hasFavorited: true
        });
    }

    // determines if the food has been favorited
    hasFavoritedFood = () => {
        this.props.favoriteFoods.forEach(food => {
            if (food.food_item_api_key == this.props.foodAPIKey & 
                food.restaurant_api_key == this.props.restaurantAPIKey) {
                this.setState({
                    hasFavorited: true
                })
            }
        });
    }

    render() {
        if (this.state.hasFavorited) {
            return (
                <button className="btn btn-sm btn-danger">
                    <Icofont icon="icofont-heart" /> Favorited
                </button>
            )
        } else {
            return (
                <button className="btn btn-sm btn-danger" onClick={ this.favoriteFood }>
                    <Icofont icon="icofont-heart" /> Favorite
                </button>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        favoriteFoods: state.favorites.favoriteFoods
    }
}

export default connect(mapStateToProps, { addFavoriteFood })(FavoriteButton);