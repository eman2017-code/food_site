
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

        default:
            return state
    }

}