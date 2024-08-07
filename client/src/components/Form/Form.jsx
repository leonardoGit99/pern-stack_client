import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import './formStyles.css';
import { createTask, updateTask } from '../../services/tasks';
import { Modal } from 'bootstrap'

function Form({ alert, showAlert, isRefresh, setRefresh, task, savedImgs }) {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [deletedUrls, setDeletedUrls] = useState([]);
  const [taskState, setTaskState] = useState("");

  console.log(taskState);

  const [body, setBody] = useState({
    title: '',
    description: '',
    imgs: images,
  });

  useEffect(() => {
    setImageUrls(savedImgs.image_paths);
  }, [savedImgs]);

  useEffect(() => {
    if (task && task.state_task === 'ToDo') {
      setTaskState("ToDo");
    } else {
      setTaskState("Completed");
    }
  }, [savedImgs]);

  useEffect(() => {
    setBody(prevBody => ({ ...prevBody, imgs: images }));
  }, [images]);

  const [editBody, setEditBody] = useState({
    title: '',
    description: '',
    imageUrls: [],
    stateTask: taskState
  })

  const onDrop = useCallback(acceptedFiles => { // Es como un onChange encargado de capturar lo que se sube en el drag and drop
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

  useEffect(() => {
    if (task.length != 0) {
      setEditBody({
        title: task.title,
        description: task.description,
        imageUrls: deletedUrls,
        stateTask: taskState
      });
    }
  }, [task, savedImgs, deletedUrls, taskState])

  const handleChange = (e) => {
    if (task.length == 0) { //No hay un id, por lo tanto, el state task es un array vacio
      const { name, value } = e.target;
      setBody({ ...body, [name]: value });
    } else {
      const { name, value } = e.target;
      setEditBody({ ...editBody, [name]: value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (task.length == 0) { //No hay un id, por ende, el state task es un array vacio
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        body.imgs.forEach((image) => {
          formData.append('imgs', image);
        });
        createTask(formData).then((data) => {
          if (data.message == "llave duplicada viola restricción de unicidad «task_title_key»") {
            window.alert("Tarea Existente");
            setLoading(false);
          } else {
            setLoading(false);
            navigate('/');
            setRefresh(true);
            showAlert(true);
            setTimeout(() => {
              showAlert(false);
            }, 2000);
          }
        });
      } else {
        updateTask(editBody, task.task_id).then((data) => {
          if (data.message == "llave duplicada viola restricción de unicidad «task_title_key»") {
            window.alert("Tarea Existente");
            setLoading(false);
          } else {
            setLoading(false);
            setRefresh(true);
            navigate('/');
            let successMsgMofification = new Modal(document.getElementById('successful-modification'));
            successMsgMofification.show();
            setTimeout(() => {
              successMsgMofification.hide();
            }, 1500);
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleStateTaskChange = () => {
    setTaskState(prevState => prevState === 'ToDo' ? 'Completed' : 'ToDo');
  };

  const onDelete = (urlToDelete) => {
    const urlsUpdated = imageUrls.filter(url => url !== urlToDelete);
    setImageUrls(urlsUpdated);

    // Add url deleted to deletedUrls' array
    setDeletedUrls(prevDeletedUrls => [...prevDeletedUrls, urlToDelete]);
  }

  const onCancel = () => {
    setRefresh(true);
    navigate("/");
  }

  return (
    <div className='form-container d-flex justify-content-center align-items-center bg-dark bg-gradient'>
      {/* Mensaje emergente dentro de un modal para la confirmacion de edición*/}
      <div className="modal fade" id="successful-modification" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
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
        {
          task.length != 0
            ?
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={taskState === 'ToDo' ? false : true}
                onChange={handleStateTaskChange}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                {taskState == 'Completed' ? <span className='text-success'><i class="bi bi-check-lg"></i> Completed</span> : <span className='text-secondary'><i class="bi bi-hourglass-split"></i> ToDo</span>}
              </label>
            </div>
            : ""
        }
        <h3 className='text-center'>{task.length != 0 ? "Edit" : "Create"} Task</h3>
        <hr className="border border-light border-1 opacity-40" />
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            aria-describedby="text"
            placeholder='Example of title task'
            onChange={handleChange}
            value={task.length == 0 ? null : editBody.title}
            autoFocus
            required
          />
          <div id="title-help" className="form-text text-secondary">{task.length != 0 ? "Edit" : "Write"} the title of task</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">Description</label>
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
        <label htmlFor="imgs" className="form-label fw-semibold">Image(s)</label><br />
        {
          task.length == 0
            ? (
              <>
                <div name="imgs" className='drag-drop-container d-flex flex-column justify-content-center align-items-center fw-light p-3' {...getRootProps()}>
                  <input id="imgs"{...getInputProps()} />
                  {
                    isDragActive ?
                      <span>Drop the files here ...</span> :
                      <span>Drag 'n' drop some images here, or click to select files</span>
                  }
                </div>
                <div className='mb-4'>
                  {
                    images && images?.map((image, index) => (
                      <p className='img-url m-1' key={index}>{image.name}</p>
                    ))
                  }
                </div>
              </>

            )
            : (
              <div className='table-container'>
                <table className='table table-dark table-borderless m-0'>
                  <tbody>
                    {imageUrls && imageUrls.map((image, index) => (
                      <tr key={index}>
                        <td className='td-image-url'>
                          <a className='img-url' key={index} href={image} target='_blank'>{image}</a>
                        </td>
                        <td className='d-flex justify-content-center'>
                          <button
                            type='button'
                            className='btn btn-outline-secondary btn-sm border-0'
                            onClick={() => onDelete(image)}
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        }

        <div className='space-btns'>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              loading || (
                task.length === 0
                  ? (body.title === '' || body.description === '')
                  : (editBody.title === task.title && editBody.description === task.description && deletedUrls.length === 0 && task.state_task === taskState)
              )
            }
          >
            {task.length != 0
              ? loading
                ? "Saving..."
                : "Save"
              : loading
                ? "Creating..."
                : "Create"}
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onCancel()}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form