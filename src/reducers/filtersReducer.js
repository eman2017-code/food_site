

const initialState = {
    foodTypes: []
}

export default function filtersReducer(state = initialState, action) {
    switch(action.type) {

        // sets a food type to the array of food types the user wants to filter restaurants by
        case 'SET_FOOD_TYPE_FILTER':
            return {
                ...state,
                foodTypes: [...state.foodTypes, action.payload]
            }

        // removes a food type from the array of food types the user wants to filter restaurants by
        case 'REMOVE_FOOD_TYPE_FILTER':
            const newFoodTypes = state.foodTypes.filter.filter(foodType => foodType != action.foodType);
            return {
                ...state,
                foodTypes: newFoodTypes
            }

        default:
            return state;
    }
}


