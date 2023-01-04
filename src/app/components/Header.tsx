import React, { useState } from 'react'
import "./../../dashboard.css";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-color.svg";
import { faSignOut,faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useLogoutMutation } from '../../features/login/login';
import { Button, Form } from 'react-bootstrap';


export default function Header() {
    const auth = useAppSelector((state) => state.auth);
    
    const [searchVal,setSearchVal] = useState("")
    const dispatch = useAppDispatch(); 
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [logout,{isLoading}] = useLogoutMutation();

  return (
    <div className='shadow header m-5  ms-0 mb-3 p-2   d-flex flex-row align-items-center justify-content-between'>
        <div className="d-flex flex-row col-3 align-items-center">

        <div>
            <img src="https://mohamedbachir120.github.io/Portfolio/Mohamed.jpg" alt="" height={50} />
        </div>
        <div className='mx-3'>
            Hello , {auth.username}
        </div>
        </div>

        <div className='col-2 '>
              <span className='text-green'> Today</span>   { new Date().getDate() +" "+ months[new Date().getMonth()]   } 
        </div>
         <div className="col-3">
         <div className="input-group">
            <input className="form-control" onChange={(e)=>{
                setSearchVal(e.target.value);
            }} list="datalistOptions" id="exampleDataList" placeholder="Type to search..."  value={searchVal}/>
            <datalist id="datalistOptions" >
            <option value="home" />
            <option value="serveurs" />
            <option value="linked-servers" />
            <option value="bdd" />
            <option value="responsable" />
            </datalist>
            <div className="input-group-append">
            <button className="btn border border-start-0 search-btn" type="button">
                <FontAwesomeIcon icon={faSearch} onClick={()=>{
                    window.location.replace(searchVal);
                }} />
            </button>
            </div>
        </div>    
        </div>   

        <div className='col-1'>
        <Button variant='light' onClick={()=> {logout("");}} title={"déconnexion"}>
            <FontAwesomeIcon icon={faSignOut}/>
        </Button>
        </div>
        </div>
  )
}
