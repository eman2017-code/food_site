import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../actions";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

  // handle change of the user input
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  handleSubmit = e => {
    e.preventDefault();
    this.props.registerUser(this.state);
  };

  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <Redirect
          to={{
            pathname: "/listing",
            // passing props
            state: { loggedInUser: this.state.loggedInUser }
          }}
        />
      );
    }
    return (
      <Container fluid className="bg-white">
        <Row>
          <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
          <Col md={8} lg={6}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <h3 className="login-heading mb-4">New Buddy!</h3>
                    <Form onSubmit={this.handleSubmit}>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="fname"
                          placeholder="First Name"
                          value={this.state.first_name}
                          onChange={this.handleChange}
                          name="first_name"
                        />
                        <Form.Label htmlFor="fname">First Name</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="lname"
                          placeholder="Last Name"
                          value={this.state.last_name}
                          onChange={this.handleChange}
                          name="last_name"
                        />
                        <Form.Label htmlFor="lname">Last Name</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="email"
                          id="email"
                          placeholder="Email address"
                          value={this.state.email}
                          onChange={this.handleChange}
                          name="email"
                        />
                        <Form.Label htmlFor="email">Email address</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="password"
                          id="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          name="password"
                        />
                        <Form.Label htmlFor="password">Password</Form.Label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Sign Up
                      </button>
                      <div className="text-center pt-3">
                        Already have an account?{" "}
                        <Link className="font-weight-bold" to="/login">
                          Sign In
                        </Link>
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

Register.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  registerUser: PropTypes.func
};

const mapStateToProps = state => {
  console.log("state in Register:", state);
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo
  };
};

export default connect(mapStateToProps, { registerUser })(Register);
