import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteDeliveryAddress } from '../../actions';
import {Modal,Button} from 'react-bootstrap';

class DeleteAddressModal extends React.Component {


	// calls the action to delete a delivery address
	handleDeleteAddressClick = () => {
		this.props.deleteDeliveryAddress(this.props.addressToDelete);
		this.props.onHide();
	}

	render() {
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        centered
		        size="sm"
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="delete-address">Delete</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
  				<p className="mb-0 text-black">Are you sure you want to delete this delivery address?</p>   
			  </Modal.Body>

			  <Modal.Footer>
				<Button 
					type='button' 
					onClick={this.props.onHide} 
					variant="outline-primary" 
					className="d-flex w-50 text-center justify-content-center"
				>
					CANCEL
				</Button>
				<Button 
					type='button' 
					onClick={this.handleDeleteAddressClick}
					variant="primary" 
					className='d-flex w-50 text-center justify-content-center'
				>
					DELETE
				</Button>
			  </Modal.Footer>
			</Modal>
    	);
    }
}

export default connect(null, { deleteDeliveryAddress })(DeleteAddressModal);