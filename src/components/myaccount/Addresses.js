import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersDeliveryAddresses, addDeliveryAddress } from '../../actions';
import {Row,Col} from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import EditAddressModal from '../modals/EditAddressModal';
import AddressCard from '../common/AddressCard';

class Addresses extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    this.state = {
	      showDeleteModal: false,
		  showAddressModal: false,
		  showEditAddressModal: false,
		  addressToEdit: {},
		  addressToDelete: 0
		};
	}

	componentDidMount() {
		this.props.getUsersDeliveryAddresses();
	}

	// opens up the modal to create or edit a delivery address
	showAddressModal = () => {
		this.setState({ 
			showAddressModal: true 
		});
	}
	
	// hides the modal to create or edit a delivery address
	hideAddressModal = () => {
		this.setState({ 
			showAddressModal: false 
		});
	}

	// opens up the modal to delete a delivery address
	showDeleteModal = (addressId) => {
		this.setState({ 
			addressToDelete: addressId,
			showDeleteModal: true 
		});
	}

	// hides the modal to delete a delivery address
	hideDeleteModal = () => {
		this.setState({ 
			addressToDelete: 0,
			showDeleteModal: false 
		});
	}


	// opens the modal to edit an address
	showEditAddressModal = address => {
		this.setState({
			addressToEdit: address,
			showEditAddressModal: true
		});
	}

	// hides the edit adress modal
	hideEditAddressModal = () => {
		this.setState({
			addressToEdit: {},
			showEditAddressModal: false
		});
	}

	render() {
    	return (
	      <>
			<AddAddressModal 
				show={this.state.showAddressModal}
				onHide={this.hideAddressModal}  />


			{
				this.state.showEditAddressModal 
				?
				<EditAddressModal 
					show={this.state.showEditAddressModal}
					onHide={this.hideEditAddressModal} 
					addressToEdit={this.state.addressToEdit} />
				:
				null
			}	
			
			<DeleteAddressModal 
				show={this.state.showDeleteModal}
				onHide={this.hideDeleteModal} 
				addressToDelete={this.state.addressToDelete}/>
		    <div className='p-4 bg-white shadow-sm'>
              <Row>
               <Col md={12} className="pb-4">
                  <h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
				  <button 
					type="button" 
					className="btn btn-primary"
					onClick={this.showAddressModal}>
						Add Delivery Address
				   </button>
               </Col>

				{
				this.props.deliveryAddresses.map(address => {
					return (
						<Col md={6} key={address.id}>
							<AddressCard  
               	  	  			boxClass="border border-primary shadow"
					  			title={address.name}
					  			icoIcon= 'ui-home'
					  			iconclassName= 'icofont-3x'
					  			address={address.address}
					  			onEditClick= {() => this.showEditAddressModal(address)}
					  			onDeleteClick={() => this.showDeleteModal(address.id)}
               	  			/>
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

export default connect(mapStateToProps, { getUsersDeliveryAddresses, addDeliveryAddress })(Addresses);