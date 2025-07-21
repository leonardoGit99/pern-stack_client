import React, { useEffect } from 'react';
import Card from '../Card/Card';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './taskListStyles.css'

function TaskList({ alert, showAlert, tasks, setRefresh, isRefresh }) {
  const toDoTasks = Array.isArray(tasks) ? tasks.filter(t => t.state_task === 'ToDo') : [];
const taskCompleted = Array.isArray(tasks) ? tasks.filter(t => t.state_task === 'Completed') : [];



  // // Solucion temporal para el loader
  // useEffect(() => {
  //   if (tasks.length != 0) {
  //     setRefresh(false);
  //   }
  // }, [tasks])
  return (
    <>
      <div className='container pt-4'>
        {alert && (
          <div className="alert alert-success" role="alert">
            Task created successfully!
          </div>
        )}
        <h2 className='d-block mb-4 text-center text-light'> <i className="bi bi-list-task"></i> Tasks</h2>
        <hr className="border border-light border-1 opacity-40" />
        {
          isRefresh
            ? (
              <div className='d-flex h-100 justify-content-center align-items-center'>
                <div className="loader"></div>
              </div>
            )
            : (
              <>
                {tasks.length === 0
                  ? <span style={{ color: 'white' }}>Create a new task...</span>
                  : (
                    <table className='table table-dark'>
                      <thead>
                        <tr className='text-center'>
                          <th scope='col' className='col-6'><span className='text-secondary'><i className="bi bi-hourglass-split"></i> ToDo</span></th>
                          <th scope='col' className='col-6'> <span className='text-success'><i className="bi bi-check-lg"></i> Completed</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {toDoTasks && toDoTasks.map((task) => (
                              <Card
                                key={task.task_id}
                                title={task.title}
                                description={task.description}
                                id={task.task_id}
                                setRefresh={setRefresh}
                              />
                            ))}
                          </td>
                          <td>
                            {taskCompleted && taskCompleted.map((task) => (
                              <Card
                                key={task.task_id}
                                title={task.title}
                                description={task.description}
                                stateTask={"Completed"}
                                id={task.task_id}
                                setRefresh={setRefresh}
                              />
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )
                }
              </>
            )
        }
      </div>
    </>
  )
}

export default TaskList