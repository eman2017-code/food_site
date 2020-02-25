import React from "react";
import { connect } from "react-redux";
import { addFavoriteFood, deleteFavoriteFood } from "../../actions";
import Icofont from "react-icofont";


class FavoriteButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFavorited: false,
        }

    }

    componentDidMount() {
        this.hasFavoritedFood();
    }

    // favorites this food
    favoriteFood = async () => {
        const foodToAdd = this.formatFoodItem();

        await this.props.addFavoriteFood(foodToAdd);

        this.setState({
            hasFavorited: true
        });
    }

    // unfavorites this food
    unFavoriteFood = () => {
        const foodToDelete = this.formatFoodItem();

        // adds the favorite food id to the object becuase the id is required for deleting it
        foodToDelete['id'] = this.getFoodItemId();

        this.props.deleteFavoriteFood(foodToDelete);

        this.setState({
            hasFavorited: false
        });
    }

    // formats the food correctly for the api call
    formatFoodItem = () => {
        const food = {
            restaurant_api_key: this.props.restaurantAPIKey,
            food_item_api_key: this.props.foodAPIKey,
            name: this.props.name,
            description: this.props.description,
            price: this.props.price,
        }
        return food;
    }

    // determines if the food has been favorited
    hasFavoritedFood = () => {
        this.props.favoriteFoods.forEach(food => {
            if (food.food_item_api_key == this.props.foodAPIKey &&
                food.restaurant_api_key == this.props.restaurantAPIKey) {
                this.setState({
                    hasFavorited: true
                })
            }
        });
    }

    // returns the food items id which is needed to delete a favorite food
    getFoodItemId = () => {
        const favoriteFoods = this.props.favoriteFoods;

        for (let i = 0; i < favoriteFoods.length; i++) {
            if (favoriteFoods[i].food_item_api_key == this.props.foodAPIKey &&
                favoriteFoods[i].restaurant_api_key == this.props.restaurantAPIKey) {
                    return favoriteFoods[i].id;
            }
        }
    }

    render() {
        if (this.state.hasFavorited) {
            return (
                <button className="btn btn-sm btn-outline-danger" onClick={ this.unFavoriteFood }>
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

export default connect(mapStateToProps, { addFavoriteFood, deleteFavoriteFood })(FavoriteButton);