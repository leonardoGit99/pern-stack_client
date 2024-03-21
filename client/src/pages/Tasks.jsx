import React, { useState, useEffect } from 'react'
import TaskList from '../components/TaskList/TaskList'
import { getAllTasks } from '../services/tasks';

function Tasks({ alert, showAlert, isRefresh, setRefresh }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (isRefresh) {
      getAllTasks().then((data) => {
        setTasks(data);
      });
    }
    setRefresh(false);
  }, [isRefresh]);


  return (
    <>
      {
        isRefresh
          ?
          <div className='d-flex h-100 justify-content-center align-items-center'>
            <div className="loader"></div>
          </div>
          :
          <TaskList
            alert={alert}
            setAlert={showAlert}
            tasks={tasks}
            setRefresh={setRefresh}
          />
      }
    </>
  )
}

export default Tasks