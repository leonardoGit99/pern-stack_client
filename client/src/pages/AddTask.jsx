import React from 'react'
import Form from '../components/Form/Form'

function AddTask({ alert, showAlert, isRefresh, setRefresh }) {
  return (
    <div>
      <Form alert={alert} showAlert={showAlert} isRefresh={isRefresh} setRefresh={setRefresh}/>
    </div>
  )
}

export default AddTask