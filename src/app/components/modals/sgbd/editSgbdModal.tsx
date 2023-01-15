import React from 'react'
import { Sgbd, useDeleteSgbdMutation, useUpdateSgbdMutation } from '../../../../features/sgbd/sgbd'
import { faDatabase , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import sgbdUi, { SgbdUiState, initialize, setName,setVersion,setCreated, setDeleted, setError, showConfirmationMessage } from '../../../../features/sgbd/sgbd-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function EditSgbdModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{sgbdUi:SgbdUiState}) => state.sgbdUi);
    const dispatch = useAppDispatch();

    const [updateSgbd,{isLoading}] = useUpdateSgbdMutation();
    
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faDatabase} /> Modifier sgbd : {uistate.sgbd.name}</Modal.Title>
      
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='example.naftal.local'
                    
                    value={uistate.sgbd.name}
                    onChange={(e)=>{
                       dispatch(setName(e.target.value)) ;
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Version</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='10.96.X.X'
                    value={uistate.sgbd.version}
                    onChange={(e)=>{
                       dispatch(setVersion(e.target.value));
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
          const sgbd = new Sgbd(uistate.sgbd.id,uistate.sgbd.name,uistate.sgbd.version);
          try {
            const payload = await updateSgbd(sgbd).unwrap();
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

export default EditSgbdModal
