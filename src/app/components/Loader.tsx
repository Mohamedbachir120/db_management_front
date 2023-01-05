import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <div className='d-flex flex-row justify-content-center align-items-center my-3'>


        <Spinner animation="border"  role="status" >
        <span className="visually-hidden">Loading...</span>
        </Spinner>


    </div>
  )
}

export default Loader
