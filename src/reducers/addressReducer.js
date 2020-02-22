
const initialState = {
    deliveryAddresses: []
}


export default function addressReducer(state = initialState, action) {

    switch (action.type) {

        case 'ADD_DELIVERY_ADDRESS':
            console.log('in ADD_DELIVERY_ADDRESS reducer');
            return {
                ...state,
                deliveryAddresses: [...state.deliveryAddresses, action.payload]
            }

        default:
            return state;
    }
}




