import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout/AppLayout';
import Tasks from './pages/Tasks';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TaskForm from './pages/TaskForm';


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
      <Route path='/' element={<AppLayout setRefresh={setRefresh}/>}>
        <Route index element={<Tasks alert={alert} showAlert={showAlert} isRefresh={isRefresh} setRefresh={setRefresh}/>} />
        <Route path='task-form' element={<TaskForm alert={alert} showAlert={showAlert} isRefresh={isRefresh} setRefresh={setRefresh}/>}/>
        <Route path='edit-task/:idTask' element={<TaskForm isRefresh={isRefresh} setRefresh={setRefresh}/>} />
      </Route>
    </Routes>
  )
}

export default App;