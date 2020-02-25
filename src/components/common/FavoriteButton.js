import React from "react";
import { connect } from "react-redux";
import { addFavoriteFood } from "../../actions";


class FavoriteButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFavorited: false,
        }
    }

    // favorites this food
    favoriteFood = () => {
        // formats the food correctly for the api call
        const foodToAdd = {
            restaurant_api_key: this.props.restaurantAPIKey,
            food_item_api_key: this.props.foodAPIKey,
            name: this.props.name,
            description: this.props.description,
            price: this.props.price,
        }

        this.props.addFavoriteFood(foodToAdd);
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
                <button>Unfavorite</button>
            )
        } else {
            return (
                <button onClick={ this.favoriteFood }>Favorite</button>
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