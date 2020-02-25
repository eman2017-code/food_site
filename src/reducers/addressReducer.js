
const initialState = {
    deliveryAddresses: []
}


export default function addressReducer(state = initialState, action) {

    switch (action.type) {

        // sets all of the users delivery addresses
        case 'SET_DELIVERY_ADDRESSES':
            console.log('delivery addresses:', action.payload);
            return {
                ...state,
                deliveryAddresses: [...action.payload]
            }

        // adds a single delivery address
        case 'ADD_DELIVERY_ADDRESS':
            return {
                ...state,
                deliveryAddresses: [...state.deliveryAddresses, action.payload]
            }

        // updates a single delivery address
        case 'UPDATE_DELIVERY_ADDRESS':

            // gets the index of the delivery address which was updated
            const deliveryAddressIndex = state.deliveryAddresses.findIndex(address => address.id === action.payload.id);

            // removes the old delivery address that was updated
            state.deliveryAddresses.splice(deliveryAddressIndex, 1);

            return {
                ...state,
                deliveryAddresses: [action.payload, ...state.deliveryAddresses]
            }

        // deletes a single delivery address
        case 'DELETE_DELIVERY_ADDRESS':
            const newDeliveryAddresses = state.deliveryAddresses.filter(address => address.id != action.payload);
            return {
                ...state,
                deliveryAddresses: newDeliveryAddresses
            }

        default:
            return state;
    }
}




