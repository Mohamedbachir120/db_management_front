
import "./../../dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/Navbar';
import Header from '../components/Header';

import { Line , Pie, Doughnut} from 'react-chartjs-2';
import { useFetchStatsQuery } from "../../features/serveur/serveur";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constantes/const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import { useUpdatePasswordMutation } from "../../features/auth/profil";
import SuccessMessage from "../components/messages/SuccessMessage";
import ErrorMessage from "../components/messages/ErrorMessage";






const Profil = () => {

    const [password,setPassword] = useState("")
    const [oldpassword,setOldPassword] = useState("")
    const [success,setSuccess] = useState(false)
    const [error,setError] = useState(false)
    
    const [updatePassword,{isLoading}] = useUpdatePasswordMutation();
 
  
  return (
    <div className='d-flex flex-row justify-content-start'>
      <div className='col-3'>
        <Navbar active={"profil"} />
      </div>
      
      <div className='col-9'>
        <Header />
        <h2 className="text-green">Profil</h2>
        <div className=" justify-content-around me-4 my-2">
            <div className="card">
                <h5><FontAwesomeIcon icon={faLock} /> Modifier mot de passe  </h5>
                
        <FormGroup className='col-4 my-1 d-flex flex-column align-items-start'>
            <Form.Label className='fw-bold text-dark'>
              Ancien mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password} 
              onChange={e => setPassword(e.target.value)}
              />
           </FormGroup>
           <FormGroup className='col-4 my-1 d-flex flex-column align-items-start'>
            <Form.Label className='fw-bold text-dark'>
             Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={oldpassword} 
              onChange={e => setOldPassword(e.target.value)}
              />
           </FormGroup>    
           <div className="d-flex flex-row justify-content-start my-2">

        {
          !isLoading? (
            <Button  className='col-4 success' variant="success" onClick={async () => {
          
          
              try {
                
                const  {message}   = await updatePassword({password:password,oldpassword:oldpassword}).unwrap();
              
                setSuccess(true); 
                setTimeout(() => {
                    setSuccess(false); 
               }, 1500);
              } catch (error) {
                setError(true); 
                setTimeout(() => {
                 setError(false); 
               }, 1500);
                
              }
            
           }}>
             Valider
           </Button>
          ) :(
            <Spinner animation="border" variant='primary' />
          )
        }
       
    
        </div>
        {success ? 
        <div className="bg-primary col-4 text-light text-center rounded p-2">
         Updated successfully
        </div> :<></>}
        {error ? 
        <div className="bg-danger col-4 text-light text-center rounded p-2">
            Old password incorrecte
        </div>
         :<></>}

            </div> 


        </div>
      </div>
      
    </div>
  )
}

export default Profil