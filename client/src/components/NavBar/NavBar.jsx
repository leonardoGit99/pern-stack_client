import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './navBarStyles.css';

function NavBar({ setRefresh }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { idTask } = useParams();
  const handleClick = (event) => {
    if (event == "newTask") {
      navigate('task-form');
    } else {
      setRefresh(true);
      navigate('/');
    }
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-black bg-gradient position-fixed">
        <div className='container'>
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <a className="navbar-brand text-light" href="/">PERN Stack</a>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div /* className="collapse navbar-collapse" */ id="navbarNav">
              {location.pathname === "/task-form"
                ?
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleClick("goBackTasks")}
                >
                  <i class="bi bi-arrow-left-circle"></i> Go to Tasks
                </button>
                : location.pathname === `/edit-task/${idTask}` ?
                  <></>
                  :
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleClick("newTask")}
                  >
                    <i className="bi bi-plus-circle"></i> New Task
                  </button>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar