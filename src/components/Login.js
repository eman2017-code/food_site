import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions";
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,Button} from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';


class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			// i create a formData object in state so the form data can be submitted to the 
			// login action easily as one entire object
			formData: {
				email: '',
				password: '',
			},
			isLoading: ''
		}
	}

	// handles changes to the forms inputs 
	handleChange = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				[e.target.name]: e.target.value
			}
		});
		console.log(this.state.formData);
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// calls the action to log in the user
		this.props.loginUser(this.state.formData);
	}

	render() {
    	return (
    	  <Container fluid className='bg-white'>
	         <Row>
	            <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
	            <Col md={8} lg={6}>
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4">Welcome back!</h3>
	                           <Form onSubmit={this.handleSubmit}>
	                              <div className="form-label-group">
																	 <Form.Control 
																		 value={this.state.formData.email}
																		 onChange={this.handleChange}
																		 name="email"
																		 type="email"
																		 id="inputEmail" 
																		 placeholder="Email address" />
	                                 <Form.Label htmlFor="inputEmail">Email address</Form.Label>
	                              </div>
	                              <div className="form-label-group">
																	 <Form.Control 
																	   value={this.state.formData.password}
																		 onChange={this.handleChange}
																		 name="password"
																		 type="password" 
																		 id="inputPassword" 
																		 placeholder="Password" />
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
	                              </div>
	                              <Form.Check  
	                              	className='mb-3'
							        						custom
							        						type="checkbox"
							        						id="custom-checkbox"
							        						label="Remember password"
							      						/>
																<button 
																	className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
																	type="submit">
																		Sign In
																</button>
	                              <Link to="/" >Sign in</Link>
	                              <div className="text-center pt-3">
	                                 Don’t have an account? <Link className="font-weight-bold" to="/register">Sign Up</Link>
	                              </div>
		                           <hr className="my-4" />
		                           <p className="text-center">LOGIN WITH</p>
		                           <div className="row">
		                              <div className="col pr-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="google" className="mr-2" /> Google</Button>
		                              </div>
		                              <div className="col pl-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="facebook" className="mr-2" /> Facebook</Button>
		                              </div>
		                           </div>
	                           </Form>
	                        </Col>
	                     </Row>
	                  </Container>
	               </div>
	            </Col>
	         </Row>
	      </Container>
    	);
    }
}

Login.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
  loginUser: PropTypes.func
}

const mapStateToProps = state => {
	return {
	  isLoggedIn: state.user.isLoggedIn,
	  userInfo: state.user.userInfo
	};
};

export default connect(mapStateToProps, { loginUser })(Login);