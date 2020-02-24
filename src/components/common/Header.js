import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Badge
} from "react-bootstrap";
import DropDownTitle from "../common/DropDownTitle";
import Icofont from "react-icofont";
import { logoutUser } from "../../actions";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isNavExpanded: false
    };
  }
  setIsNavExpanded = isNavExpanded => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  closeMenu = () => {
    this.setState({ isNavExpanded: false });
  };

  handleClick = e => {
    if (this.node.contains(e.target)) {
      // if clicked inside menu do something
    } else {
      // If clicked outside menu, close the navbar.
      this.setState({ isNavExpanded: false });
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }
  render() {
    return (
      <div ref={node => (this.node = node)}>
        <Navbar
          onToggle={this.setIsNavExpanded}
          expanded={this.state.isNavExpanded}
          color="light"
          expand="lg"
          className="navbar-light osahan-nav shadow-sm"
        >
          <Container>
            <Navbar.Brand to="/">
              <Image src="/img/logo.png" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/"
                >
                  Home <span className="sr-only">(current)</span>
                </Nav.Link>
                <Nav.Link
                  eventKey={1}
                  as={NavLink}
                  activeclassname="active"
                  to="/offers"
                >
                  <Icofont icon="sale-discount" /> Offers{" "}
                  <Badge variant="danger">New</Badge>
                </Nav.Link>
                <NavDropdown
                  title="Restaurants"
                  alignRight
                  className="border-0"
                >
                  <NavDropdown.Item
                    eventKey={2.1}
                    as={NavLink}
                    activeclassname="active"
                    to="/listing"
                  >
                    Listing
                  </NavDropdown.Item>
                </NavDropdown>
                {this.props.isLoggedIn ? (
                  <NavDropdown
                    alignRight
                    title={
                      <DropDownTitle
                        className="d-inline-block"
                        image="img/user/4.png"
                        imageAlt="user"
                        imageClass="nav-osahan-pic rounded-pill"
                        title="My Account"
                      />
                    }
                  >
                    <NavDropdown.Item
                      eventKey={4.1}
                      as={NavLink}
                      activeclassname="active"
                      to="/myaccount/orders"
                    >
                      <Icofont icon="food-cart" /> Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey={4.2}
                      as={NavLink}
                      activeclassname="active"
                      to="/myaccount/offers"
                    >
                      <Icofont icon="sale-discount" /> Offers
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey={4.3}
                      as={NavLink}
                      activeclassname="active"
                      to="/myaccount/favourites"
                    >
                      <Icofont icon="heart" /> Favourites
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey={4.4}
                      as={NavLink}
                      activeclassname="active"
                      to="/myaccount/payments"
                    >
                      <Icofont icon="credit-card" /> Payments
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey={4.5}
                      as={NavLink}
                      activeclassname="active"
                      to="/myaccount/addresses"
                    >
                      <Icofont icon="location-pin" /> Addresses
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey={4.5}
                      activeclassname="active"
                      to="/myaccount/addresses"
                      onClick={this.props.logoutUser}
                    >
                      <Icofont icon="location-pin" /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown title="Login/Register" alignRight>
                    <NavDropdown.Item
                      eventKey={3.3}
                      as={NavLink}
                      activeclassname="active"
                      to="/login"
                    >
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey={3.4}
                      as={NavLink}
                      activeclassname="active"
                      to="/register"
                    >
                      Register
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/checkout"
                >
                  Cart <span className="sr-only">(current)</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);
