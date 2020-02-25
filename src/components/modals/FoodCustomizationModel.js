import React from 'react';
import { connect } from "react-redux";
import { Form, Modal, Button } from 'react-bootstrap';


class FoodCustomizatonModal extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { foodItem } = this.props;
   
        return (
            <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        size="md"
		        centered>
                <Modal.Header closeButton={true}>
                    <Modal.Title as='h5' id="edit-profile">{ foodItem.name }</Modal.Title>
			    </Modal.Header>
                <Modal.Body>
                    <p className="text-gray">
                        { foodItem.description }
                    </p>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null, {})(FoodCustomizatonModal);

