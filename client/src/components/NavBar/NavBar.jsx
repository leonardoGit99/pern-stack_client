import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './navBarStyles.css';

function NavBar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('task-form');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-black bg-gradient position-fixed">
        <div className='container'>
          <div className="container-fluid d-flex justify-content-between">
            <a className="navbar-brand text-light" href="/">PERN Stack</a>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div /* className="collapse navbar-collapse" */ id="navbarNav">
              <button type="button" className="btn btn-primary" onClick={() => handleClick()}>New Task</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar