/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import fire from '../config/Fire';

import userIcon from '../user-icon.png'

const signOut = (e) => {
  e.preventDefault();
  fire.auth().signOut()
  .catch(err => {
    console.log(err.code);
    console.log(err.message);
  })
}

const loginButton = (auth) => {
  if (auth) {
    return (
      <>
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
          <img 
            style={{ borderRadius:"100px" }}
            className="shadow-sm" 
            src={userIcon} 
            width="25" 
            height="25" 
            alt="user menu"
          />
        </a>
        <div className="dropdown-menu dropdown-menu-right ml-auto">
          <Link to="changePassword">
            <a className="dropdown-item" href="#">Change Password</a>
          </Link>
          <div class="dropdown-divider"></div>
          <a className="dropdown-item" href="#" onClick={(e) => signOut(e)}>Logout</a>
        </div>
      </>
    )
  } else {
    return (
      <Link to='/login'>
        <button 
          style={{ borderRadius:"100px", width:"120px" }} 
          className="btn btn-outline-primary active"
        >
          Login
        </button>
      </Link>
    )
  }
}

export default loginButton;