import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Nav.css';
import logo from '../../images/logo.svg'

class Nav extends Component {
  renderAuthStatus() {
    switch (this.props.auth) {
      case null:
        return;
      case false: 
        return (<li className="right"><a className="nav-item active" href="/auth/google">Login With Google</a></li>);
      default:
        return (<li className="right"><a className="nav-item active" href="api/logout">Logout</a></li>);
}
  }

  render() {
    return (
      <ul className="nav">
        <li>
          <a className="nav-item" href="#home">
            <img className="logo" src={logo} alt="soccer silhouette"></img>
          </a>
        </li>
        <li>
          <a className="nav-item" href="#about">
            My Reviews
          </a>
        </li>
        {this.renderAuthStatus()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Nav);
