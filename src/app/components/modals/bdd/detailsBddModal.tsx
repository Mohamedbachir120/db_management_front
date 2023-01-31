import React from 'react'
import { Bdd, useDeleteBddMutation } from '../../../../features/bdd/bdd'
import { faDatabase , faEdit ,  faEraser, faCheck, faXmark, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import serverUi, { initialize, setDeleted,showEdit , setError, showConfirmationMessage, hideDetail } from '../../../../features/bdd/bdd-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'
import { BddUiState } from '../../../../features/bdd/bdd-ui'
import { Link } from 'react-router-dom'

function DetailsBddModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{bddUi:BddUiState}) => state.bddUi);
    const dispatch = useAppDispatch();

    const [deleteBdd,{isLoading,isError,isSuccess,reset}] = useDeleteBddMutation();
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showDetail} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faDatabase} /> Détails Base de données</Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.isDeleted?     
    !uistate.isError?
    !uistate.showConfirmationMessage ?
    <Modal.Body>
        <ul className='list-unstyled card'>
            <li className='list-style-none'> <span className='text-green fw-bold'>Nom : &nbsp;</span>   
                {uistate.bdd.name}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>status : &nbsp;</span>   
            {uistate.bdd.status}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Serveur : &nbsp;</span>   
                {uistate.bdd.server.dns}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Sgbd : &nbsp;</span>   
            {uistate.bdd.sgbd.name}</li>     
 
             <li className='list-style-none'> <span className='text-green fw-bold'>Date de création : &nbsp;</span>   
            {uistate.bdd.creation_date}</li> 
            <li className='list-style-none'> <span className='text-green fw-bold'>Engine : &nbsp;</span>   
            {uistate.bdd.engine}</li>   
                
        </ul>
        <div className='d-flex flex-row justify-content-between col-11'>
        <Link  className='btn btn-outline-warning col-4 mx-2' to={"/bdd/access/"+uistate.bdd.id.toString()}>
               <FontAwesomeIcon icon={faKey}  />  Access
            </Link>
            <Button variant='outline-success' className='col-4 mx-2' onClick={()=>{
                    dispatch(hideDetail());
                    dispatch(showEdit());
            }}>
               <FontAwesomeIcon icon={faEdit} />  Modifier
            </Button>
            <Button variant='outline-danger' className='col-4 mx-2' onClick={
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
            <p className='text-center'>La suppression d'une base de données , supprimera tous les objets liés Linked Server ,BDD, Users , Accès .. </p>
            <div className='d-flex flex-row justify-content-between col-11'>
            <Button variant='secondary' className='col-6 mx-2' onClick={()=>{
                dispatch(initialize());
            }}>
               <FontAwesomeIcon icon={faXmark}  />  Annuler
            </Button>
            <Button variant='primary' className='col-6 mx-2' onClick={async ()=>{
                    try {
                        const payload = await deleteBdd(uistate.bdd.id).unwrap();
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

export default DetailsBddModal
