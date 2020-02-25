import React from 'react';
import { connect } from "react-redux";
import { Form, Modal, Button } from 'react-bootstrap';


class FoodCustomizatonModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            customizations: []
        }
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
        console.log('customization options:', parsedResponse.data);
        
        // sets the food items customization options in the state
        if (parsedResponse.status.code === 200) {
            this.setState({ customizations: parsedResponse.data });
        }
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
                    <Modal.Title as='h5' id="edit-profile">{foodItem.name}</Modal.Title>
			    </Modal.Header>
                <Modal.Body>
                    <p className="text-gray">{foodItem.description}</p>

                    <Form>
                        {
                        this.state.customizations.map((customization, i) => {
                        return (
                            <Form.Group key={customization.apiKey}>
                                <Form.Label key={i}>
                                    {customization.name}
                                </Form.Label>

                                {customization.customizations.map((choice, i) => {
                                    return (
                                        <div key={i}>
                                            <Form.Label>{choice.name}</Form.Label>
                                            <Form.Control as="select" key={choice.apiKey}>

                                                {choice.customizationChoices.map((option, i) => {
                                                    return (
                                                        <option key={option.apiKey}>
                                                            { option.name } - ${ option.price }
                                                        </option>
                                                    )
                                                })}    
                                                    
                                            </Form.Control>
                                        </div>
                                    )
                                })}
                            </Form.Group>    
                        )
                        })
                        }
                    </Form>

                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null, {})(FoodCustomizatonModal);

