import React from 'react';
import { connect } from "react-redux";
import { Form, Modal, Button } from 'react-bootstrap';


class FoodCustomizatonModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            customizationOptions: {}
        }
        console.log('foodItem:', this.props.foodItem);
    }

    componentDidMount() {
        this.getCustomizationOptions();
    }

    // gets all of the customization options for the food item
    getCustomizationOptions = async () => {
        const apiURL = 'http://localhost:8000/api/v1/food-item-customizations/?food_item_api_key=' + 
                        this.props.foodItem.apiKey

        const response = await fetch(apiURL, {
            method: 'GET',
            credentials: 'include'
        });
        const parsedResponse = await response.json();
        console.log('response:', parsedResponse);
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
                    <p className="text-gray">{ foodItem.description }</p>

                    <Form>
                        
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null, {})(FoodCustomizatonModal);

