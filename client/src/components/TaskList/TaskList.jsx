import React from 'react';
import Card from '../Card/Card';
import './taskListStyles.css'

function TaskList({ alert, showAlert, tasks, setRefresh, isRefresh }) {
  return (
    <>
      <div className='container pt-4'>
        {alert && (
          <div className="alert alert-success" role="alert">
            Task created successfully!
          </div>
        )}
        <h2 className='d-block mb-4 text-center text-light'>Task List</h2>
        <hr className="border border-light border-1 opacity-40" />
        {
          isRefresh
            ? (
              <div className='d-flex h-100 justify-content-center align-items-center'>
                <div className="loader"></div>
              </div>
            )
            : (
              tasks.length === 0
                ? <span style={{color:'white'}}> Create a new task...</span>
                : tasks.map((task) => (
                  <Card
                    key={task.task_id}
                    title={task.title}
                    description={task.description}
                    id={task.task_id}
                    setRefresh={setRefresh}     
                  />
                ))
            )
        }
      </div>
    </>
  )
}

export default TaskList