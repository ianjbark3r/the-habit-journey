/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import loginButton from '../components/LoginButton';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-light justify-content-between fixed-top bg-light shadow-sm">
				<Link className="navbar-brand" to='/'>
        	<strong style={{ fontFamily:"'Domine', serif" }}>thj</strong>
				</Link>
        {loginButton(this.props.auth)}
      </nav>
    );
  }
};