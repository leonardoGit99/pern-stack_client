import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './navBarStyles.css';

function NavBar({ currentRoute }) {
  const [path, setPath] = useState(currentRoute);
  const navigate = useNavigate();
  const handleClick = () => {
    if (path === "/") {
      navigate('task-form');
      setPath('/task-form');
    } else if (path === "/task-form") {
      navigate('/');
      setPath('/');
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-black bg-gradient position-fixed">
        <div className='container'>
          <div className="container-fluid d-flex justify-content-between">
            <Link className="navbar-brand text-light" to="/">PERN Stack</Link>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div /* className="collapse navbar-collapse" */ id="navbarNav">
              <button type="button" className="btn btn-primary" onClick={() => handleClick()}>{currentRoute === "/task-form" ? "View Tasks" : "New Task"}</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar