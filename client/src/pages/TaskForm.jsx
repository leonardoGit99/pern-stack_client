import React, { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import { useParams } from 'react-router-dom';
import { getTask } from '../services/tasks';
import { getImgsTask } from '../services/imgs';

function TaskForm({ alert, showAlert, isRefresh, setRefresh }) {
  const { idTask } = useParams();
  const [task, setTask] = useState([]);
  const [savedImgs, setSavedImgs] = useState([]);
  const [isLoading, setIsLoading] = useState(!!idTask); // loader solo si hay idTask

  useEffect(() => {
    if (idTask) {
      setIsLoading(true);

      Promise.all([getTask(idTask), getImgsTask(idTask)])
        .then(([taskData, imgsData]) => {
          setTask(taskData);
          setSavedImgs(imgsData);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [idTask]);



  return (
    <div>
      {isLoading ? (
        <div className='d-flex h-full justify-content-center align-items-center'>
          <div className="loader"></div>
        </div>
      ) : (
        <Form
          alert={alert}
          showAlert={showAlert}
          isRefresh={isRefresh}
          setRefresh={setRefresh}
          task={task}
          savedImgs={savedImgs}
        />
      )}
    </div>
  )
}

export default TaskForm