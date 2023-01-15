import React from 'react'
import { Access,  useUpdateAccessMutation } from '../../../../features/access/access'
import { faKey  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import accessUi, { AccessUiState, initialize,setCreated,  setError,  setUsername, setPwd, setAuthType } from '../../../../features/access/access-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function EditAccessModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{accessUi:AccessUiState}) => state.accessUi);
    const dispatch = useAppDispatch();

    const [updateAccess,{isLoading}] = useUpdateAccessMutation();
    
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faKey} /> Modifier access : {uistate.access.username}</Modal.Title>
      
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
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='example.naftal.local'
                    
                    value={uistate.access.username}
                    onChange={(e)=>{
                       dispatch(setUsername(e.target.value)) ;
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='*********'
                    value={uistate.access.pwd}
                    onChange={(e)=>{
                       dispatch(setPwd(e.target.value));
                    }}
                    />
             </Form.Group> 
             <Form.Group>
                <Form.Label>Auth type</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Auth type"
                    min="0"
                    max="1"
                    value={uistate.access.auth_type}
                    
                    onChange={(e)=>{
                       dispatch(setAuthType(parseInt(e.target.value)));
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
          const access = new Access(uistate.access.id,uistate.access.username,uistate.access.pwd,uistate.access.auth_type);
        
           await updateAccess(access).then((e) => {
             
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

export default EditAccessModal
