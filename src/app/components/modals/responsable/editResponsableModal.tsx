import React from 'react'
import { Responsable, useDeleteResponsableMutation, useUpdateResponsableMutation } from '../../../../features/responsable/responsable'
import { faDatabase , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import responsableUi, { ResponsableUiState, initialize, setName,setEmail,setCreated, setDeleted, setError, showConfirmationMessage, setPhone } from '../../../../features/responsable/responsable-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function EditResponsableModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{responsableUi:ResponsableUiState}) => state.responsableUi);
    const dispatch = useAppDispatch();

    const [updateResponsable,{isLoading}] = useUpdateResponsableMutation();
    
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faDatabase} /> Modifier responsable : {uistate.responsable.name}</Modal.Title>
      
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
                    placeholder='Name '
                    
                    value={uistate.responsable.name}
                    onChange={(e)=>{
                       dispatch(setName(e.target.value)) ;
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='user@naftal.dz'
                    value={uistate.responsable.email}
                    onChange={(e)=>{
                       dispatch(setEmail(e.target.value));
                    }}
                    />
             </Form.Group> 
             <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='+213 xx xx xx xx'
                    value={uistate.responsable.phone}
                    onChange={(e)=>{
                       dispatch(setPhone(e.target.value));
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
          const responsable = new Responsable(uistate.responsable.id,uistate.responsable.name,uistate.responsable.email,uistate.responsable.phone,[]);
          try {
            const payload = await updateResponsable(responsable).unwrap();
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

export default EditResponsableModal
