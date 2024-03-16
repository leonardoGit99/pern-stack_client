import React, { useEffect, useState } from 'react'
import EditForm from '../components/EditForm/EditForm'
import { getTask } from '../services/tasks';
import { useParams } from 'react-router-dom';
function EditTask({ isRefresh, setRefresh }) {
  const { idTask } = useParams();
  const [task, setTask] = useState([]);
  useEffect(() => {
    getTask(idTask).then((data) => {
      setTask(data);
    })
  }, [idTask]);
  return (
    <>
      <EditForm task={task} isRefresh={isRefresh} setRefresh={setRefresh}/>
    </>
  )
}

export default EditTask