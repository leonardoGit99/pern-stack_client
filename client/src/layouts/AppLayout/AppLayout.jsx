import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import './appLayoutStyles.css';

function AppLayout() {
  return (
    <div>
      <NavBar />
      <div className='pages-container'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout