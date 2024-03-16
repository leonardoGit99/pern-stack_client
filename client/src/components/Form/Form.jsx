import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formStyles.css';
import { createTask } from '../../services/tasks';

function Form({ alert, showAlert, isRefresh, setRefresh }) {
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const [body, setBody] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createTask(body).then((data) => {
        if (data.message == "llave duplicada viola restricción de unicidad «task_title_key»") {
          window.alert("Tarea Existente");
        } else {
          showAlert(true);
          setRefresh(true);
          navigate('/');
          setTimeout(() => {
            showAlert(false);
          }, 2000);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='form-container d-flex justify-content-center align-items-center bg-dark bg-gradient'>
      <form
        className='form rounded text-light'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h3 className='text-center'>Create Task {task.title}</h3>
        <hr class="border border-light border-1 opacity-50" />
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
            required
          />
          <div id="title-help" className="form-text text-secondary">Write the title of task</div>
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
            required
          />
          <div id="description-help" className="form-text text-secondary">Write the description of task</div>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  )
}

export default Form