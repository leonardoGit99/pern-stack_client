import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './appLayoutStyles.css';

function AppLayout({setRefresh}) {
  return (
    <div>
      <NavBar setRefresh={setRefresh}/>
      <div className='pages-container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout