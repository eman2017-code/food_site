
const initialState = {
    deliveryAddresses: []
}


export default function addressReducer(state = initialState, action) {

    switch (action.type) {

        // sets all of the users delivery addresses
        case 'SET_DELIVERY_ADDRESSES':
            return {
                ...state,
                deliveryAddresses: action.payload
            }

        // adds a single delivery address
        case 'ADD_DELIVERY_ADDRESS':
            return {
                ...state,
                deliveryAddresses: [...state.deliveryAddresses, action.payload]
            }

        default:
            return state;
    }
}




