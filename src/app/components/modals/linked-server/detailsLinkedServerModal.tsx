import React from 'react'
import { LinkedServer, useDeleteLinkedServerMutation } from '../../../../features/linked-server/linked-server'
import { faServer , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import serverUi, { initialize, setDeleted,showEdit , setError, showConfirmationMessage, hideDetail } from '../../../../features/linked-server/linked-server-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'
import { LinkedServerUiState } from '../../../../features/linked-server/linked-server-ui'

function DetailsLinkedServerModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{linkedServerUi:LinkedServerUiState}) => state.linkedServerUi);
    const dispatch = useAppDispatch();

    const [deleteLinkedServer,{isLoading,isError,isSuccess,reset}] = useDeleteLinkedServerMutation();
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showDetail} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faServer} /> Détails Linked server</Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.isDeleted?     
    !uistate.isError?
    !uistate.showConfirmationMessage ?
    <Modal.Body>
        <ul className='list-unstyled card'>
            <li className='list-style-none'> <span className='text-green fw-bold'>Nom : &nbsp;</span>   
                {uistate.server.name}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>type : &nbsp;</span>   
            {uistate.server.type}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Source : &nbsp;</span>   
                {uistate.server.source.dns}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Destination : &nbsp;</span>   
            {uistate.server.destination.dns}</li>     

             <li className='list-style-none'> <span className='text-green fw-bold'>Date de création : &nbsp;</span>   
            {uistate.server.creation_date}</li> 
            <li className='list-style-none'> <span className='text-green fw-bold'>Méthode de création : &nbsp;</span>   
            {uistate.server.create_method}</li>   
                
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
            <p className='text-center'>La suppression d'un serveur , supprimera tous les objets liés Linked Server ,BDD, Users , Accès .. </p>
            <div className='d-flex flex-row justify-content-between col-11'>
            <Button variant='secondary' className='col-6 mx-2' onClick={()=>{
                dispatch(initialize());
            }}>
               <FontAwesomeIcon icon={faXmark}  />  Annuler
            </Button>
            <Button variant='primary' className='col-6 mx-2' onClick={async ()=>{
                    try {
                        const payload = await deleteLinkedServer(uistate.server.id).unwrap();
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

export default DetailsLinkedServerModal
