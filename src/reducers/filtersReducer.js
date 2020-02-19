

const initialState = {
    foodTypes: []
}

export default function filtersReducer(state = initialState, action) {
    switch(action.type) {

        // sets what restuarants are show based on food types the user specifies
        case 'SET_FOOD_TYPE_FILTERS':
            return {
                ...state,
                foodTypes: [...state.foodTypes, action.payload]
            }
        
        default:
            return state;
    }
}


