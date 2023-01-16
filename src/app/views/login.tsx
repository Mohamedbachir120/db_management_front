import {  useState } from 'react'
import logo from './../../assets/logo-color.svg'

import './../../App.css'
import { useAppDispatch,useAppSelector } from './../hooks'
import { Button, ToastContainer } from 'react-bootstrap'
import { loginParams, useLoginMutation } from './../../features/login/login'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormGroup from 'react-bootstrap/esm/FormGroup'
import datacenter from "./../../assets/2794209.png"
import { faEnvelope , faLock , faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthState, setCredentials } from './../../features/auth/auth-slice'
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

function Login() {
  const [loginp,setLoginparams] = useState(new loginParams("",""))
  const [login,{isLoading}] = useLoginMutation();
  const auth = useAppSelector((state:{auth:AuthState}) => state.auth);
  const [position, setPosition] = useState('bottom-end');

  const [error,setError] = useState(false);
  const dispatch = useAppDispatch();

 
  
  return(
    <div className="App d-flex flex-column align-items-center">

      <header className='col-12 bg-white'>
        
        <a href="#" target="_blank">
          <img src={logo} className="" alt=" logo" height={100} />
        </a>
       
      </header>
      <main className='d-flex flex-row align-items-center justify-content-center col-12'>
        <div className='col-2'>

        </div>
        <div className='col-4 ps-5 pt-5'>
          <h1 className='text-white text-start my-5'>
            DB Management 
          </h1>
          <h5 className='text-white text-start my-5'>
          The power of imagination makes us infinite


          </h5>
          <div>

          <img src={datacenter} id="datacenter" alt="data center"  />
          </div>

        </div>

      <div className="col-4 pt-5 pe-5">
      <h1 className='mt-5 text-white text-center'>CONNEXION</h1>
  
        <Form className='mt-3'>
          <Form.Group className='my-3 d-flex flex-column align-items-start' controlId='formBasicEmail'>
            <Form.Label className='fw-bold text-white'>
          <FontAwesomeIcon icon={faEnvelope} className="me-2"  />

              Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={loginp.email}
              onChange={e => setLoginparams(loginp => ({...loginp, email: e.target.value }))}
            />

           </Form.Group>
           <FormGroup className='my-3 d-flex flex-column align-items-start'>
            <Form.Label className='fw-bold text-white'>
            <FontAwesomeIcon icon={faLock} className="me-2"  />
              Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={loginp.password} 
              onChange={e => setLoginparams(loginp => ({...loginp, password: e.target.value}))}
              />
           </FormGroup>
        </Form>
        <div className="d-flex flex-row justify-content-center">

        {
          !isLoading? (
            <Button  className='w-100 sign-in' onClick={async () => {
          
          
              try {
                
                const  {id,name,token}   = await login(loginp).unwrap();
                dispatch(setCredentials(new AuthState(true,token,name,id)));
                window.location.replace("/home");
              } catch (error) {
                setError(true); 
                setTimeout(() => {
                 setError(false); 
               }, 1500);
                
              }
            
           }}>
             Se connecter
             <FontAwesomeIcon icon={faSignInAlt} className="ms-2" />
           </Button>
          ) :(
            <Spinner animation="border" variant='light' />
          )
        }
       
    
        </div>
        
        
      </div>
      <div className='col-2'>

        </div>
      </main>
      { error && (<ToastContainer position={'bottom-end'} >
      <Toast onClose={()=>{setError(false)}} >
        <Toast.Header className='bg-danger text-light'>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Erreur</strong>
        </Toast.Header>
        <Toast.Body>Mot de passe incorrecte</Toast.Body>
      </Toast>
   
    </ToastContainer>)
   }


    </div>
  ) 
}

export default Login
