import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cover from '../home-image.jpg';

export default class Home extends Component {
  render() {
    return (
      <div 
        style={{ 
          backgroundImage:`url(${cover})`,
          backgroundPosition:"right top",
          backgroundSize:"cover", 
          height:"100vh" 
        }} 
        className="container-fluid"
      >
        <div className="row justify-content-center">
          <div className="col">
            <h1 style={{ textAlign:"center", paddingTop:"30vh" }} className='display-3 mx-auto'>The Habit Journey</h1>
          </div>
        </div>
        <div style={{ marginTop:"10vh" }} className="row justify-content-center">
          <div className="col text-center">
            <Link to='/signup'>
              <button 
                style={{ borderRadius:"100px", width:"150px" }} 
                type="button" 
                className="btn btn-primary btn-lg shadow-sm" 
              >
                Start
              </button>
            </Link>
            <Link className="ml-3" to='/learn'>
              <button 
                style={{ 
                  borderRadius:"100px", 
                  color:"black", 
                  width:"150px" 
                }} 
                type="button" 
                className="btn btn-secondary btn-lg shadow-sm"
              >
                Learn
              </button>
            </Link>
          </div>
        </div>
        <div style={{ marginTop:"14vh", marginBottom:"3vh" }} className="row justify-content-center">
          <div className="col text-center">
            <a style={{ color:"black" }} href="https://unsplash.com/photos/VieM9BdZKFo">
              (Photo by Leone Venter on Unsplash)
            </a>
          </div>
        </div>
      </div>
    );
  }
};