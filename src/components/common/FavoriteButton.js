import React from "react";
import { connect } from "react-redux";


class FavoriteButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFavorited: false
        }
    }

    render() {
        if (this.state.hasFavorited) {
            return (
                <button>Favorite</button>
            )
        } else {
            return (
                <button>Unfavorite</button>
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