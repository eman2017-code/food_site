
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

        default:
            return state
    }

}