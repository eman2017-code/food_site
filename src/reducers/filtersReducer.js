

const initialState = {
    foodTypes: []
}

export default function filtersReducer(state = initialState, action) {
    switch(action.type) {

        // sets what restuarants are show based on food types the user specifies
        case 'SET_FOOD_TYPES':
            return {
                ...state,
                foodTypes: action.payload
            }
        
        default:
            return state;
    }
}


