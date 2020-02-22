import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDeliveryAddress } from '../../actions';
import {Row,Col} from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import AddressCard from '../common/AddressCard';

class Addresses extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    this.state = {
	      showDeleteModal: false,
      	  showAddressModal: false,
		};
		console.log('initial addresses props:', this.props.deliveryAddresses);
	}

	// opens up the modal to create or edit a delivery address
	showAddressModal = () => this.setState({ showAddressModal: true });
	
	// hides the modal to create or edit a delivery address
	hideAddressModal = () => this.setState({ showAddressModal: false });

	// opens up the modal to delete a delivery address
	showDeleteModal = () => this.setState({ showDeleteModal: true });

	// hides the modal to delete a delivery address
	hideDeleteModal = () => this.setState({ showDeleteModal: false });

	render() {
    	return (
	      <>
	        <AddAddressModal show={this.state.showAddressModal} onHide={this.hideAddressModal}/>
	        <DeleteAddressModal show={this.state.showDeleteModal} onHide={this.hideDeleteModal}/>
		    <div className='p-4 bg-white shadow-sm'>
              <Row>
               <Col md={12}>
                  <h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
				  <button 
					type="button" 
					className="btn btn-primary"
					onClick={this.showAddressModal}>
						Add Delivery Address
					</button>
               </Col>
               {/* <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="border border-primary shadow"
					  title= 'Home'
					  icoIcon= 'ui-home'
					  iconclassName= 'icofont-3x'
					  address= 'Osahan House, Jawaddi Kalan, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => this.setState({ showAddressModal: true })}
					  onDeleteClick={() => this.setState({ showDeleteModal: true })}
               	  />
               </Col> */}
              </Row>
		    </div>
	      </>
    	);
    }
}

Addresses.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
  	deliveryAddresses: PropTypes.array.isRequired
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		deliveryAddresses: state.addresses.deliveryAddresses
	}
}

export default connect(mapStateToProps, { addDeliveryAddress })(Addresses);