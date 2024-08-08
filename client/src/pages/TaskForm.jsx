import React, { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import { useParams } from 'react-router-dom';
import { getTask } from '../services/tasks';
import { getImgsTask } from '../services/imgs';

function TaskForm({ alert, showAlert, isRefresh, setRefresh }) {
  const { idTask } = useParams();
  const [task, setTask] = useState([]);
  const [savedImgs, setSavedImgs] = useState([]);

  useEffect(() => {
    if (idTask) {
      getTask(idTask).then((data) => {
        setTask(data);
      })
      getImgsTask(idTask).then((data) => {
        setSavedImgs(data);
      })
    }
  }, [idTask]);


  return (
    <div>
      <Form alert={alert} showAlert={showAlert} isRefresh={isRefresh} setRefresh={setRefresh} task={task} savedImgs={savedImgs} />
    </div>
  )
}

export default TaskForm