import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions";
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Spinner } from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';


class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			// created a formData object in state so the form data can be submitted to the 
			// login action easily as one entire object
			formData: {
				email: '',
				password: '',
			},
			isLoading: false
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
	}

	// handles the login form submission
	handleSubmit = async (e) => {
		e.preventDefault();

		// shows the loading icon
		this.setState({ isLoading: true });

		// calls the action to log in the user
		this.props.loginUser(this.state.formData).then(loginResponse => {
			if (loginResponse.status.code !== 200) {
				console.log('login failed');
			}
		});

		// hides the loading icon after the login response is received
		this.setState({ isLoading: false });
	}

	render() {
			// if the user logs in successfully, then redirect they are redirected
			if (this.props.isLoggedIn) {
				return (
					<Redirect to='/listing' />
				)
			}

				// if the form was submitted and the app is waiting for the api respoonse,
				// then this button will a loading icon will be rendered		
				let signInButton;		
				if (this.state.isLoading) {
						signInButton = 
						<button 
							className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
							type="submit">
								<Spinner
      						as="span"
      						animation="border"
      						size="sm"
      						role="status"
      						aria-hidden="true"
    						/>
						</button>
				// if the form is not waiting for the api response, then the normal button will be rendered
				} else {
					signInButton = 
						<button 
							className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
							type="submit">
								Sign In
						</button>
				}

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

																{ signInButton }

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