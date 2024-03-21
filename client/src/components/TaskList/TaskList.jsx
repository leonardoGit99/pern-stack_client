import React from 'react';
import Card from '../Card/Card';
import './taskListStyles.css'

function TaskList({ alert, showAlert, tasks, setRefresh }) {
  return (
    <>
      <div className='container pt-3'>
        {alert && (
          <div className="alert alert-success" role="alert">
            Task created successfully!
          </div>
        )}
        <h2 className='d-block mb-4 text-center text-light'>Task List</h2>
        <hr class="border border-light border-2 opacity-50" />
        {
          tasks.length == 0
            ?
              <p className='text-white-50 fs-5'>Please, create a task...</p>
            :
            tasks.map((task) => (
              <Card
                title={task.title}
                description={task.description}
                id={task.id}
                setRefresh={setRefresh}
              />
            ))
        }
      </div>
    </>
  )
}

export default TaskList