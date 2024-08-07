import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { deleteTask } from '../../services/tasks'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap';
import { getImgsTask } from '../../services/imgs';
import { baseLocalUrl as api } from "../../services/api.config";
import './cardStyles.css';

function Card({ title, description, id, setRefresh, stateTask }) {
  const navigate = useNavigate();
  const [imgsTask, setImgsTask] = useState({});

  const handleClick = async (action) => {
    if (action == "delete") {
      const taskDeleted = await deleteTask(id);
      if (taskDeleted) {
        setRefresh(true);
      }
    } else if (action == "edit") {
      navigate(`/edit-task/${id}`);
    } else if (action == "view") {
      getImgsTask(id).then((data) => {
        console.log(data);
        setImgsTask(data);
      });
      /* let imgModal = new Modal(document.getElementById('img-modal'));
      imgModal.show(); */
    }
  }


  return (

    <div className="card w-100 mb-3 text-light" key={id}>
      <div className="card-body row">
        <div className='card-flex-container  d-flex  justify-content-between align-items-center'>
          <div className='col-8 col-xs-12  p-3 '>
            <h5
              className={stateTask == "Completed"
                ? "card-title fw-bold text-decoration-line-through"
                : "card-title fw-bold"}
            >
              {title}
            </h5>
            <p className={stateTask == "Completed"
              ? "card-text fw-light text-decoration-line-through"
              : "card-text fw-light"}>
              {description}
            </p>
          </div>
          <div className='vertical-line'>
            &nbsp;
          </div>
          <div className='horizontal-line'>
            &nbsp;
          </div>
          <div className='card__buttons col-4 col-xs-0 d-flex justify-content-center'>
            {/* Button trigger VIEW IMG modal */}
            <button
              type="button"
              className="btn btn-secondary me-3"
              data-bs-toggle="modal"
              data-bs-target={`#imgModal-${id}`}
              onClick={() => handleClick("view")}
            >

              <i className="bi bi-eye-fill" />
            </button>

            {/* View modal actioned by handleClick function */}
            <div className="modal fade" id={`imgModal-${id}`} tabIndex="-1" aria-labelledby="imgModal" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  {/* Carousel de imagenes */}
                  <div id={`carouselImgs-${id}`} className="carousel slide">
                    {/* Indicators active or not*/}
                    <div className="carousel-indicators">
                      {imgsTask.image_paths && imgsTask.image_paths.map((_, index) => (
                        // bottom buttons
                        <button
                          key={index}
                          type="button"
                          data-bs-target={`#carouselImgs-${id}`}
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : ""}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                    {/* Arrows active or not*/}
                    <div className="carousel-inner">
                      {imgsTask.image_paths && imgsTask.image_paths.map((img, index) => (
                        <div
                          key={index}
                          className={index === 0 ? "carousel-item active" : "carousel-item"}
                        >
                          <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                    {/* Previous arrow */}
                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselImgs-${id}`} data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    {/* Next arrow */}
                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselImgs-${id}`} data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit button */}
            <button
              type="button"
              className="btn btn-primary me-3"
              /* data-bs-toggle="modal"
              data-bs-target="#editModal" */
              onClick={() => { handleClick("edit") }}
            >
              <i className="bi bi-pencil-square" />
            </button>

            {/* Delete button */}
            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target={`#deleteModal-${id}`}
            >
              <i className="bi bi-trash" />
            </button>
          </div>

          {/* Modal */}
          <div className="modal fade" id={`deleteModal-${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                  <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" id="confirmDeleteBtn" onClick={() => { handleClick("delete") }}>Ok</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Card