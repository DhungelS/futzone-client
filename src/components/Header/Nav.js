import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Nav.css';

class Nav extends Component {
  renderAuthStatus() {
    switch (this.props.auth) {
      case null:
        return 'Still deciding';
      case false: 
        return 'logged out';
      default:
        return 'logged in';
  }
}

  render() {
    return (
      <ul className="nav">
        <li>
          <a className="nav-item" href="#home">
            Home
          </a>
        </li>
        <li>
          <a className="nav-item" href="#about">
            About
          </a>
        </li>
        <li className="right">{this.renderAuthStatus()}</li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Nav);
