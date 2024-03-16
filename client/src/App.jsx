import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout/AppLayout';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import EditTask from './pages/EditTask';


function App() {
  const [alert, setAlert] = useState(false);

  const showAlert = (status) => {
    setAlert(status);
  }

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
    setIsRefresh(status);
  }
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Tasks alert={alert} showAlert={showAlert} isRefresh={isRefresh} setRefresh={setRefresh}/>} />
        <Route path='task-form' element={<AddTask alert={alert} showAlert={showAlert} isRefresh={isRefresh} setRefresh={setRefresh}/>}/>
        <Route path='edit-task/:idTask' element={<EditTask isRefresh={isRefresh} setRefresh={setRefresh}/>} />
      </Route>
    </Routes>
  )
}

export default App;