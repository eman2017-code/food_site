
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
            const newFavoriteFoods = state.favoriteFoods.filter(food => food.id != action.payload.id);    

            return {
                ...state,
                favoriteFoods: newFavoriteFoods
            }

        default:
            return state
    }

}