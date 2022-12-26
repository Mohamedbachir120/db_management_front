import { useState } from 'react'
import logo from './assets/logo-color.svg'

import './App.css'
import { useAppDispatch,useAppSelector } from './app/hooks'
import { Button } from 'react-bootstrap'
import { loginParams, useLoginMutation } from './app/auth/login'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormGroup from 'react-bootstrap/esm/FormGroup'
import datacenter from "./assets/2794209.png"
import { faEnvelope , faLock , faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [loginp,setLoginparams] = useState(new loginParams("bachir.hadjadji@naftal.dz","moh12345"))
  const [login,{isLoading}] = useLoginMutation();

  return (
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

        <Button  className='w-100 sign-in' onClick={async () => {
          
          
        
          const result= await login(loginp);
          
          
          
        }}>
          Se connecter
          <FontAwesomeIcon icon={faSignInAlt} className="ms-2" />
        </Button>
        </div>
        
        
      </div>
      <div className='col-2'>

        </div>
      </main>
    </div>
  )
}

export default App
