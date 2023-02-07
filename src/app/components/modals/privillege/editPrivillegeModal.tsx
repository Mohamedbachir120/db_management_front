import React from 'react'
import { Privillege, useUpdatePrivillegeMutation } from '../../../../features/privillege/privillege'
import {  faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import  { PrivillegeUiState, initialize,setCreated, setError, setName, setSecurable  } from '../../../../features/privillege/privillege-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'



function EditPrivillegeModal({refetch}:{refetch:()=>void}) {
  const uistate = useAppSelector((state:{privillegeUi:PrivillegeUiState}) => state.privillegeUi);
  const dispatch = useAppDispatch();
  
    const [updatePrivillege,{isLoading}] = useUpdatePrivillegeMutation();
    
    
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faLock} /> Modifier privillege : {uistate.privillege.name}</Modal.Title>
      
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
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Nom de la privillege'
                    value={uistate.privillege.name}
                    onChange={(e)=>{
                        dispatch(setName(e.target.value));
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Status du linked server'
                    value={uistate.privillege.securable}
                    onChange={(e)=>{
                     dispatch(setSecurable(e.target.value));
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
            const privillege = new Privillege(uistate.privillege.id,uistate.privillege.name,uistate.privillege.securable,0);
          try {
            const payload =  await updatePrivillege(privillege).unwrap();
            dispatch(setCreated());
            refetch();
          } catch (error) {
            dispatch(setError()) ;

            
          }
          setTimeout(() => {
            dispatch(initialize());
            
        }, 2000);
         
          
         

         
          
          
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

export default EditPrivillegeModal
