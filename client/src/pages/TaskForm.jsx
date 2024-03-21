import React, { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import { useParams } from 'react-router-dom';
import { getTask } from '../services/tasks';

function TaskForm({ alert, showAlert, isRefresh, setRefresh }) {
  const { idTask } = useParams();
  const [task, setTask] = useState([]);

  useEffect(() => {
    if (idTask) {
      getTask(idTask).then((data) => {
        setTask(data);
      })
    }
  }, [idTask]);


  return (
    <div>
      <Form alert={alert} showAlert={showAlert} isRefresh={isRefresh} setRefresh={setRefresh} task={task} />
    </div>
  )
}

export default TaskForm