import React from 'react'
import { Server, useDeleteServerMutation } from '../../../../features/serveur/serveur'
import { faServer , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import serverUi, { ServerUiState, initialize, setDeleted,showEdit , setError, showConfirmationMessage, hideDetail } from '../../../features/serveur/server-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function DetailsServerModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{serverUi:ServerUiState}) => state.serverUi);
    const dispatch = useAppDispatch();

    const [deleteServer,{isLoading,isError,isSuccess,reset}] = useDeleteServerMutation();
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showDetail} onHide={handleClose}   size="md" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faServer} /> Détails serveur</Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.isDeleted?     
    !uistate.isError?
    !uistate.showConfirmationMessage ?
    <Modal.Body>
        <ul className='list-unstyled card'>
            <li className='list-style-none'> <span className='text-green fw-bold'>DNS : &nbsp;</span>   
                {uistate.server.dns}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>IP : &nbsp;</span>   
            {uistate.server.ip}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Instance name : &nbsp;</span>   
                {uistate.server.instance_name}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>OS Version : &nbsp;</span>   
            {uistate.server.OSversion}</li>     

             <li className='list-style-none'> <span className='text-green fw-bold'>Port : &nbsp;</span>   
            {uistate.server.port}</li>    
                
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
                    await deleteServer(uistate.server.id).then((e)=>{
                        if(e.data != null){
                            
                            dispatch(setDeleted());
                            refetch();
                        }else{
                           dispatch(setError()) ;
                        }
                        setTimeout(() => {
                            dispatch(initialize());
            
                        }, 2000);
                    })
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

export default DetailsServerModal
