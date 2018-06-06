import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "mdbreact";
import { Link } from "react-router-dom";

class NavbarFeatures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  onMouseOver() {
    this.setState({
      dropdownOpen: true
    });
  }
  onMouseLeave() {
    this.setState({
      dropdownOpen: false
    });
  }

  render() {
    let rightNav = <div>Loading</div>;

    if (this.props.auth.token) {
      rightNav = <div>{this.props.auth.customer.displayName}</div>;
    } else {
      rightNav = <div>Utente</div>;
    }

    return (
      <Navbar color="green" light expand="md" scrolling>
        <NavbarBrand href="/">
          <strong>Navbar</strong>
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
            <NavItem active>
              <NavLink to="#">Home</NavLink>
            </NavItem>
            <NavItem>
              <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
                onMouseOver={this.onMouseOver}
              >
                <DropdownToggle nav>Abbigliamento</DropdownToggle>
                <DropdownMenu>
                  <div onMouseLeave={this.onMouseLeave}>
                    <DropdownItem href="/shop/boots">Stivali</DropdownItem>
                    <DropdownItem href="/shop/shirts">Magliette</DropdownItem>
                    <DropdownItem href="/shop/Knitwear">Maglioni</DropdownItem>
                    <DropdownItem href="/shop/T-Shirts">T-Shirts</DropdownItem>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <NavLink to="/checkout">Checkout</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cart">Carrello</NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              {rightNav}
              {/* <form className="form-inline md-form mt-0">
                             <input
                               className="form-control mr-sm-2 mb-0 text-white"
                               type="text"
                               placeholder="Search"
                               aria-label="Search"
                             />
                           </form>*/}
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavbarFeatures;
