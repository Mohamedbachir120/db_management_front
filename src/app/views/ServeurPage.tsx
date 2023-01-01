import React from 'react'
import  Navbar  from './../components/Navbar'

export default function ServeurPage() {
  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"serveur"} />

      </div>
      <div className='col-9'>
        </div>

      {/* <div>
        <button onClick={() => {
          logout("")
          
          }}>Sign out</button>
        

      </div> */}
    </div>
  )
}
