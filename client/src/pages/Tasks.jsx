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
    // setRefresh(false);
  }, [isRefresh]);


  return (
    <>
      <TaskList
        alert={alert}
        setAlert={showAlert}
        tasks={tasks}
        setRefresh={setRefresh}
        isRefresh={isRefresh}
      />
    </>
  )
}

export default Tasks