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

mapStateToProps = state => {
    return {
        favoriteFoods: state.favorite.favoriteFoods
    }
}

export default connect(mapStateToProps, {})(FavoriteButton);