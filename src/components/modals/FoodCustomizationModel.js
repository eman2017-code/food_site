import React from 'react';
import { connect } from "react-redux";
import { Form, Modal, Button } from 'react-bootstrap';


class FoodCustomizatonModal extends React.Component {

    render() {
        return (
            <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        size="lg"
		        centered>
                <Modal.Header closeButton={true}>
			        <Modal.Title as='h5' id="edit-profile">Edit profile</Modal.Title>
			    </Modal.Header>
                 
            </Modal>
        )
    }
}

export default connect(null, {})(FoodCustomizatonModal);

