// // filters which restaurants are shown on the listing page
// export const restaurantFilter = (restaurants, filters) => {
//     const foodTypes = filters.foodTypes;

//     // if there are no food types to filter by
//     if (foodTypes.length === 0) {
//         return restaurants;
//     }

//     // checks if each restaurant matches the food types the user wants to filter by
//     const filteredRestaurants = restaurants.filter(restaurant => {

//         // incase, for some reason, foodTypes is a field in the restaurant object
//         if (restaurant.foodTypes) {
//             for (let i=0; i < foodTypes.length; i++) {
//                 if (restaurant.foodTypes.includes(foodTypes[i])) {
//                     return restaurant;
//                 }
//             }
//         }

//     });
//     return filteredRestaurants;
// }
