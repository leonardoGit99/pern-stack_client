import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formStyles.css';
import { createTask, updateTask } from '../../services/tasks';
import { Modal } from 'bootstrap'

function Form({ alert, showAlert, isRefresh, setRefresh, task }) {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    title: '',
    description: ''
  });

  const [editBody, setEditBody] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (task.length != 0) {
      setEditBody({
        title: task.title,
        description: task.description
      });
    }
  }, [task])

  const handleChange = (e) => {
    if (task.length == 0) { //No hay un id, por ende, el state task es un array vacio
      const { name, value } = e.target;
      setBody({ ...body, [name]: value });
    } else {
      const { name, value } = e.target;
      setEditBody({ ...editBody, [name]: value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task.length == 0) { //No hay un id, por ende, el state task es un array vacio
        createTask(body).then((data) => {
          if (data.message == "llave duplicada viola restricción de unicidad «task_title_key»") {
            window.alert("Tarea Existente");
          } else {
            navigate('/');
            setRefresh(true);
            showAlert(true);
            setTimeout(() => {
              showAlert(false);
            }, 2000);
          }
        });
      } else {
        updateTask(editBody, task.id).then((data) => {
          if (data.message == "llave duplicada viola restricción de unicidad «task_title_key»") {
            window.alert("Tarea Existente");
          } else {
            setRefresh(true);
            navigate('/');
            let successMsgMofification = new Modal(document.getElementById('successful-modification'));
            successMsgMofification.show();
            setTimeout(()=>{
              successMsgMofification.hide();
            }, 1500);
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='form-container d-flex justify-content-center align-items-center bg-dark bg-gradient'>
      {/* Mensaje emergente dentro de un modal para la confirmacion de edición*/}
      <div class="modal fade" id="successful-modification" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div className="alert alert-success m-0 text-center" role="alert">
              Successful Modification!
            </div>
          </div>
        </div>
      </div>
      <form
        className='form rounded text-light'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h3 className='text-center'>{task.length != 0 ? "Edit" : "Create"} Task</h3>
        <hr className="border border-light border-1 opacity-50" />
        <div className="mb-3">
          <label for="title" className="form-label fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            aria-describedby="text"
            placeholder='Example of title task'
            onChange={handleChange}
            value={task.length == 0 ? null : editBody.title}
            required
          />
          <div id="title-help" className="form-text text-secondary">{task.length != 0 ? "Edit" : "Write"} the title of task</div>
        </div>
        <div className="mb-3">
          <label for="description" className="form-label fw-semibold">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name='description'
            placeholder='Example of description task'
            rows={3}
            onChange={handleChange}
            value={task.length == 0 ? null : editBody.description}
            required
          />
          <div id="description-help" className="form-text text-secondary">{task.length != 0 ? "Edit" : "Write"} the description of task</div>
        </div>
        <button type="submit" className="btn btn-primary">{task.length != 0 ? "Save" : "Create"}</button>
      </form>
    </div>
  )
}

export default Form