import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './appLayoutStyles.css';

function AppLayout() {
  const location = useLocation();
  const currentRoute = location.pathname;
  return (
    <div>
      <NavBar currentRoute= {currentRoute}/>
      <div className='pages-container'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout