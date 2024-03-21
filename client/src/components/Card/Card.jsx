import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { deleteTask } from '../../services/tasks'
import { useNavigate } from 'react-router-dom'
import './cardStyles.css';

function Card({ title, description, id, setRefresh}) {
  const navigate = useNavigate();
  const handleClick = async (action) => {
    if (action == "delete") {
      const taskDeleted = await deleteTask(id);
      if (taskDeleted) {
        setRefresh(true);
      }
    } else {
      navigate(`/edit-task/${id}`);
    }
  }
  return (
    <>
      <div className="card w-100 mb-3 text-light" id={id}>
        <div className="card-body">
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary me-3"
                /* data-bs-toggle="modal"
                data-bs-target="#editModal" */
                onClick={() => { handleClick("edit") }}
              >
                <i className="bi bi-pencil-square" />
              </button>
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal-${id}`}
              >
                <i className="bi bi-trash" />
              </button>
              {/* Modal */}
              <div className="modal fade" id={`deleteModal-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content text-black">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Delete task</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      Are you sure to delete the task "{title}"?
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal" id="confirmDeleteBtn" onClick={() => { handleClick("delete") }}>Ok</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card