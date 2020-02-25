import React from 'react';
import { connect } from "react-redux";
import { Form, Modal, Button, Badge } from 'react-bootstrap';


class FoodCustomizatonModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            customizations: [],
            additionalCharges: [],
            totalPrice: this.props.foodItem.basePrice
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

    // when a food option is selected from a dropdown box
    foodOptionSelected = (e) => {
        const selectionApiKey = e.target;
        const optionApiKey = e.target.options[e.target.selectedIndex];

        console.log('selectionApiKey:', selectionApiKey);
        console.log('optionApiKey:', optionApiKey);


        
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
                    <Modal.Title as='h5'>{foodItem.name}</Modal.Title>
			    </Modal.Header>
                <Modal.Body>
                    <p className="text-gray">{foodItem.description}</p>
                    <Form>
                        {
                        this.state.customizations.map((customization, i) => {
                        return (
                            <Form.Group key={i} apikey={customization.apiKey}>
                                <h6 className="font-weight-bold text-center mt-2">
                                    {customization.name}
                                </h6>

                                {customization.customizations.map((choice, i) => {
                                    return (
                                        <div key={i} className="mt-3">
                                            {choice.name ? (<Form.Label>{choice.name}</Form.Label>) : ""}
                                            <Form.Control 
                                                as="select" 
                                                apikey={ choice.apiKey } 
                                                onChange={ this.foodOptionSelected } >

                                                {choice.customizationChoices.map((option, i) => {
                                                    return ( 
                                                        <option 
                                                            key={i}
                                                            apikey={ option.apiKey } 
                                                            value={ option.price } >
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
                    <div className="d-flex justify-content-between">
                        <h4>
                            <Badge variant="light">Total: ${ foodItem.basePrice }</Badge>
                        </h4>
                        <Button
                            // onClick={() => this.props.showFoodCustomizationModal(this.props.foodItem)}
                            variant="secondary"
                            size="md">
                            Add To Cart
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null, {})(FoodCustomizatonModal);

