import React from "react";
import { connect } from "react-redux";


class FavoriteButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFavorited: false
        }
    }


    favoriteFoodItem = () => {
        
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
                <button>Favorite</button>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        favoriteFoods: state.favorites.favoriteFoods
    }
}

export default connect(mapStateToProps, {})(FavoriteButton);