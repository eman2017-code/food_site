
const initialState = {
    favoriteFoods: []
}


export default function favoritesReducer(state = initialState, action) {

    switch (action.type) {

        // sets all of the users favorite foods
        case 'SET_FAVORITE_FOODS':
            return {
                ...state,
                favoriteFoods: action.payload
            }

        // adds a favorite food to the users favorite foods
        case 'ADD_FAVORITE_FOOD':
            return {
                ...state,
                favoriteFoods: [action.payload, ...state.favoriteFoods]
            }

        // removes a favorite food from the users favorite foods
        case 'DELETE_FAVORITE_FOOD':
            // creates a new array of the users favorite foods without the one the deleted
            const newFavoriteFoods = state.favoriteFoods.filter(food => {
                if (food.restaurant_api_key != action.payload.restaurant_api_key &&
                    food.food_item_api_key != action.payload.food_item_api_key) {
                    return true;
                }
            });    

            return {
                ...state,
                favoriteFoods: newFavoriteFoods
            }

        default:
            return state
    }

}