import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersFavoriteFoods } from '../../actions';
import {Row,Col,Button,Spinner} from 'react-bootstrap';
import CardItem from '../common/CardItem';
import FavoriteFoodCard from '../common/FavoriteFoodCard.js';


class Favourites extends React.Component {

	componentDidMount() {
		this.props.getUsersFavoriteFoods();
		console.log('initial favorite foods:', this.props.favoriteFoods);
	}

	render() {
    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	                 <Col md={12}>
	                    <h4 className="font-weight-bold mt-0 mb-3">Favourites</h4>
	                 </Col>
					 {
						 this.props.favoriteFoods.map(food => {
							return (
								<Col md={4} sm={6} key={food.id} className="mb-4 pb-2">
									<FavoriteFoodCard 
										name={food.name}
										description={food.description}
										price={food.price}
										restaurant_api_key={food.restaurant_api_key}
										food_item_api_key={food.food_item_api_key}
									/>

	                    			{/* <CardItem 
					   					title={food.name}
										subTitle={food.description}
						    			linkUrl='detail'
										time='15–25 min'
										price={food.price}
										apiKey={food.restaurant_api_key}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
					   				/> */}
	                 			</Col>

							)
						 })
					 }
	                 
	              </Row>
			    </div>
		    </>
    	);
    }
}

const mapStateToProps = state => {
	return {
		favoriteFoods: state.favorites.favoriteFoods
	}
}

export default connect(mapStateToProps, { getUsersFavoriteFoods })(Favourites);