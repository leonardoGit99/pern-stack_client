import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './editFormStyles.css';
import { updateTask } from '../../services/tasks';


function EditForm({ task, isRefresh, setRefresh }) {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (task) {
      setBody({
        title: task.title,
        description: task.description
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateTask(body, task.id);
      setRefresh(true);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-100 bg-dark bg-gradient'>
      <form
        className='form rounded text-light'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h3 className='text-center'>Edit Task</h3>
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
            value={body.title}
            onChange={handleChange}
            required
          />
          <div id="title-help" className="form-text text-secondary">Edit the title of task</div>
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
            value={body.description}
            onChange={handleChange}
            required
          />
          <div id="description-help" className="form-text text-secondary">Edit the description of task</div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default EditForm