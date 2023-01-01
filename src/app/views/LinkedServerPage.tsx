import React from 'react'
import  Navbar  from '../components/Navbar'

export default function LinkedServerPage() {
  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"linked-server"} />

      </div>

      {/* <div>
        <button onClick={() => {
          logout("")
          
          }}>Sign out</button>
        

      </div> */}
    </div>
  )
}
