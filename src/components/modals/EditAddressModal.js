import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editDeliveryAddress } from '../../actions';
import {Form,InputGroup,Modal,ButtonToolbar,Button,ToggleButton,ToggleButtonGroup} from 'react-bootstrap';
import Icofont from 'react-icofont';

class EditAddressModal extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
			id: props.addressToEdit.id || '',
			name: props.addressToEdit.name || '',
			address: props.addressToEdit.address || '',			
			instructions: props.addressToEdit.instructions || ''
		}
	} 

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = () => {
		this.props.editDeliveryAddress(this.state);
		this.props.onHide();
	}

	render() {
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        centered
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="add-address">Edit Delivery Address</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
  				<Form>
             <div className="form-row">

				<Form.Group className="col-md-12">
                   <Form.Label>Name</Form.Label>
				   <Form.Control 
					   type="text"
					   name="name"
					   value={this.state.name}
					   onChange={this.handleChange} 
					   placeholder="Provide a name for this delivery address" />
                </Form.Group>

                <Form.Group className="col-md-12">
                   <Form.Label>Complete Address</Form.Label>
				   <InputGroup>
						<Form.Control 
						   type="text" 
						   name="address"
						   value={this.state.address}
						   onChange={this.handleChange}
						   placeholder="Complete Address e.g. house number, street name, landmark" />
				   		<InputGroup.Append>
                        	<Button variant="outline-secondary" type="button" id="button-addon2"><Icofont icon="ui-pointer"/></Button>
                      	</InputGroup.Append>
				   </InputGroup>
                </Form.Group>

                <Form.Group className="col-md-12">
                   <Form.Label>Delivery Instructions</Form.Label>
				   <Form.Control 
					    type="text"
					    name="instructions"
					    value={this.state.instructions}
						onChange={this.handleChange}
				        placeholder="Delivery Instructions e.g. Opposite Gold Souk Mall" />
                </Form.Group>

             </div>
          </Form>      
			  </Modal.Body>

			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="d-flex w-50 text-center justify-content-center">CANCEL</Button>
				<Button 
					type='button' 
					variant="primary" 
					className='d-flex w-50 text-center justify-content-center'
					onClick={this.handleSubmit}>
						SUBMIT
					</Button>
			  </Modal.Footer>
			</Modal>
    	);
    }
}


export default connect(null, { editDeliveryAddress })(EditAddressModal);