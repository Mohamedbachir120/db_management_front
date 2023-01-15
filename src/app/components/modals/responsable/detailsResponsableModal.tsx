import React from 'react'
import { Responsable, useDeleteResponsableMutation } from '../../../../features/responsable/responsable'
import { faDatabase , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import responsableUi, { ResponsableUiState, initialize, setDeleted,showEdit , setError, showConfirmationMessage, hideDetail } from '../../../../features/responsable/responsable-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function DetailsResponsableModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{responsableUi:ResponsableUiState}) => state.responsableUi);
    const dispatch = useAppDispatch();

    const [deleteResponsable,{isLoading,isError,isSuccess,reset}] = useDeleteResponsableMutation();
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showDetail} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faDatabase} /> Détails Responsable</Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.isDeleted?     
    !uistate.isError?
    !uistate.showConfirmationMessage ?
    <Modal.Body>
        <ul className='list-unstyled card'>
            <li className='list-style-none'> <span className='text-green fw-bold'>Name : &nbsp;</span>   
                {uistate.responsable.name}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Email : &nbsp;</span>   
            {uistate.responsable.email}</li>
            <li className='list-style-none'> <span className='text-green fw-bold'>Phone : &nbsp;</span>   
            {uistate.responsable.phone}</li>
                
        </ul>
        <div className='d-flex flex-row justify-content-between col-11'>
            <Button variant='success' className='col-6 mx-2' onClick={()=>{
                    dispatch(hideDetail());
                    dispatch(showEdit());
            }}>
               <FontAwesomeIcon icon={faEdit} />  Modifier
            </Button>
            <Button variant='danger' className='col-6 mx-2' onClick={
                ()=>{
                    
                dispatch(showConfirmationMessage());
               }}>
               <FontAwesomeIcon icon={faEraser}  />  Supprimer
            </Button>
        </div>

      </Modal.Body>
     : ( 
        <Modal.Body>
            <h5 className='text-center'>Êtes vous sûre ?</h5>
            <p className='text-center'>La suppression d'un responsable , supprimera tous les objets liés Linked Responsable ,BDD, Users , Accès .. </p>
            <div className='d-flex flex-row justify-content-between col-11'>
            <Button variant='secondary' className='col-6 mx-2' onClick={()=>{
                dispatch(initialize());
            }}>
               <FontAwesomeIcon icon={faXmark}  />  Annuler
            </Button>
            <Button variant='primary' className='col-6 mx-2' onClick={async ()=>{
                try {
                    const payload = await  deleteResponsable(uistate.responsable.id).unwrap();
                    dispatch(setDeleted());
                    refetch();
                  } catch (error) {
                    dispatch(setError()) ;

                  }
                 
                setTimeout(() => {
                    dispatch(initialize());
    
                }, 2000);
               }}>
               <FontAwesomeIcon icon={faCheck}  /> Supprimer
            </Button>
        </div>
        </Modal.Body>
     ):(<ErrorMessage message="Opération échoué" />) :
     (<SuccessMessage message='Supprimé avec succès' />) :
     (<Loader />)
     }
      
  </Modal>

  )
}

export default DetailsResponsableModal
