import React from 'react'
import { Access, useDeleteAccessMutation } from '../../../../features/access/access'
import { faKey , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import accessUi, { AccessUiState, initialize, setDeleted,showEdit , setError, showConfirmationMessage, hideDetail } from '../../../../features/access/access-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function DetailsAccessModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{accessUi:AccessUiState}) => state.accessUi);
    const dispatch = useAppDispatch();

    const [deleteAccess,{isLoading,isError,isSuccess,reset}] = useDeleteAccessMutation();
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showDetail} onHide={handleClose}   size="md" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faKey} /> Détails access</Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.isDeleted?     
    !uistate.isError?
    !uistate.showConfirmationMessage ?
    <Modal.Body>
        <ul className='list-unstyled card'>
            <li className='list-style-none'> <span className='text-green fw-bold'>Username : &nbsp;</span>   
                {uistate.access.username}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Password : &nbsp;</span>   
            </li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Auth type : &nbsp;</span>   
                {uistate.access.auth_type == 0 ? "Sql authentication": "server authentication"}</li>

              
                
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
            <p className='text-center'>La suppression d'un access , supprimera tous les objets liés Linked Access ,BDD, Users , Responsable .. </p>
            <div className='d-flex flex-row justify-content-between col-11'>
            <Button variant='secondary' className='col-6 mx-2' onClick={()=>{
                dispatch(initialize());
            }}>
               <FontAwesomeIcon icon={faXmark}  />  Annuler
            </Button>
            <Button variant='primary' className='col-6 mx-2' onClick={async ()=>{
                    await deleteAccess(uistate.access.id).then((e)=>{
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

export default DetailsAccessModal
