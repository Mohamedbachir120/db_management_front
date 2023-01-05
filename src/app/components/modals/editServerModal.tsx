import React from 'react'
import { Server, useDeleteServerMutation, useUpdateServerMutation } from '../../../features/serveur/serveur'
import { faServer , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import serverUi, { ServerUiState, initialize, setDns,setInstance,setIp,setOSVersion,setPort,setCreated, setDeleted, setError, showConfirmationMessage } from '../../../features/serveur/server-ui'
import { useAppDispatch, useAppSelector } from '../../hooks'
import ErrorMessage from '../messages/ErrorMessage'
import SuccessMessage from '../messages/SuccessMessage'
import Loader from '../Loader'

function EditServerModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{serverUi:ServerUiState}) => state.serverUi);
    const dispatch = useAppDispatch();

    const [updateServer,{isLoading}] = useUpdateServerMutation();
    
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faServer} /> Modifier serveur : {uistate.server.dns}</Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.created?     
    !uistate.isError?
   ( 
    <div>
   <Modal.Body>
        
        <Form>
            <Form.Group>
                <Form.Label>DNS</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='example.naftal.local'
                    
                    value={uistate.server.dns}
                    onChange={(e)=>{
                       dispatch(setDns(e.target.value)) ;
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>IP</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='10.96.X.X'
                    value={uistate.server.ip}
                    onChange={(e)=>{
                       dispatch(setIp(e.target.value));
                    }}
                    />
             </Form.Group> 
             <Form.Group>
                <Form.Label>OS Version</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Windows server 2019"
                    value={uistate.server.OSversion}
                    
                    onChange={(e)=>{
                       dispatch(setOSVersion(e.target.value));
                    }}
                    />
             </Form.Group>  
             <Form.Group>
                <Form.Label>Instance name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="instance name"
                    value={uistate.server.instance_name}
                    onChange={(e)=>{
                        dispatch(setInstance(e.target.value));
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Port</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="1433"
                    value={uistate.server.port} 
                    onChange={(e)=>{
                       dispatch(setPort(e.target.value)) ;
                    }}
                    />
             </Form.Group>     
        </Form>

      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Annuler
      </Button>
      <button className="btn bg-primaire" onClick={async () => {
          const server = new Server(uistate.server.id,uistate.server.dns,uistate.server.ip,uistate.server.OSversion,uistate.server.instance_name,uistate.server.port);
        
           await updateServer(server).then((e) => {
             
              if(e.data != null) {

                  dispatch(setCreated());
                  refetch();
              }else{
                 dispatch(setError()) ;
              }
              
              setTimeout(() => {
                  dispatch(initialize());
                  
              }, 2000);

           });
         
          
         

         
          
          
      }}>
        Valider
      </button>
    </Modal.Footer>
    </div>
    )
     : (<ErrorMessage message="Opération échoué" />) :
     (<SuccessMessage message='Modifié avec succès' />) :
     (<Loader />)
     }
      
  </Modal>

  )
}

export default EditServerModal
