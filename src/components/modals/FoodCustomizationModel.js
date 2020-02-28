import React from 'react';
import { connect } from "react-redux";
import { Form, Modal, Button, Badge } from 'react-bootstrap';
import { addToCart } from '../../actions';


class FoodCustomizatonModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            customizations: [],
            additionalCharges: [],
            totalPrice: parseFloat(this.props.foodItem.basePrice)
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
        
        // sets the food items customization options in the state
        if (parsedResponse.status.code === 200) {
            this.setState({ customizations: parsedResponse.data });
        }
    }

    // when a food option is selected from a dropdown box
    foodOptionSelected = async (e) => {

        // gets the attributes from the select boxes 
        const selectionApiKey = e.target.getAttribute('apikey');
        const selectionName = e.target.getAttribute('name');
        const optionApiKey = e.target.childNodes[e.target.selectedIndex].getAttribute('apikey');
        const optionPrice = e.target.childNodes[e.target.selectedIndex].getAttribute('price');
        const optionName = e.target.childNodes[e.target.selectedIndex].getAttribute('name');

        await this.verifyAdditionalChargesAreUnique(selectionApiKey);

        const additionalChargeToAdd = {
            selectionApiKey: selectionApiKey,
            selectionName: selectionName,
            optionApiKey: optionApiKey,
            price: parseFloat(optionPrice),
            optionName: optionName 
        }
 
        this.setState({ 
            additionalCharges: [additionalChargeToAdd, ...this.state.additionalCharges], 
            totalPrice: this.state.totalPrice += additionalChargeToAdd.price
        });
    }


    // checks if a new customization that was added does not already have another option selected 
    // for that same customzation
    verifyAdditionalChargesAreUnique = async (selectionApiKeyToCheck) => {

        // removes any additional charge in state that matches the selection api key in the parameter
        const verifiedUniqueCustomizations = this.state.additionalCharges.filter(charge => {
            if (charge.selectionApiKey === selectionApiKeyToCheck) {
                const updatedTotalPrice = this.state.totalPrice - charge.price;
                this.setState({ totalPrice: updatedTotalPrice });
                return false;
            }
            return true;
        });

        this.setState({
            additionalCharges: verifiedUniqueCustomizations
        });
    }

    // handles adding the formatted food object to the store
    handleAddToCart = () => {
        const formattedFoodItem = this.formatFoodItem();
        console.log('formattedFoodItem:', formattedFoodItem);

        this.props.addToCart(formattedFoodItem);
        this.props.onHide();
    }

    // formats the food item object to it includes all of the food customizations, and updates the totalPrice
    formatFoodItem = () => {
        const formattedFoodItem = {
            ...this.props.foodItem,
            totalPrice: this.state.totalPrice,
            customizations: this.state.additionalCharges,
            restaurant: this.props.restaurant
        } 
        return formattedFoodItem;
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
                                                name={ choice.name }
                                                onChange={ this.foodOptionSelected } >

                                                {choice.customizationChoices.map((option, i) => {
                                                    return ( 
                                                        <option 
                                                            key={i}
                                                            apikey={ option.apiKey } 
                                                            price={ option.price } 
                                                            name={ option.name } >
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
                            <Badge variant="light">Total: ${ this.state.totalPrice }</Badge>
                        </h4>
                        <Button
                            onClick={this.handleAddToCart}
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

export default connect(null, { addToCart })(FoodCustomizatonModal);

