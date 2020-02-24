import React from 'react';
import {Row,Col,Button,Spinner} from 'react-bootstrap';
import CardItem from '../common/CardItem';

class Favourites extends React.Component {

	render() {
    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	                 <Col md={12}>
	                    <h4 className="font-weight-bold mt-0 mb-3">Favourites</h4>
	                 </Col>
	                 <Col md={4} sm={6} className="mb-4 pb-2">
	                    <CardItem 
					   		title='Bite Me Sandwiches'
							subTitle='North Indian • American • Pure veg'
						  	imageAlt='Product'
						    image='img/list/1.png'
						    imageClass='img-fluid item-img'
						    linkUrl='detail'
						    offerText='65% off Coupon OSAHAN50'
						    offerColor='danger'
							time='15–25 min'
							price='$100 FOR TWO'
							showPromoted={true}
							promotedVariant='dark'
							favIcoIconColor='text-danger'
							rating='3.1 (300+)'
					   	/>
	                 </Col>
	              </Row>
			    </div>
		    </>
    	);
    }
}
export default Favourites;