import {  useDeletePrivillegeMutation } from '../../../../features/privillege/privillege'
import {  faEdit ,  faEraser, faCheck, faXmark, faKey, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import  { initialize, setDeleted,showEdit , setError, showConfirmationMessage, hideDetail } from '../../../../features/privillege/privillege-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'
import { PrivillegeUiState } from '../../../../features/privillege/privillege-ui'
import { Link } from 'react-router-dom'

function DetailsPrivillegeModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{privillegeUi:PrivillegeUiState}) => state.privillegeUi);
    const dispatch = useAppDispatch();

    const [deletePrivillege,{isLoading}] = useDeletePrivillegeMutation();
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showDetail} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faLock} /> Détails Privillège </Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.isDeleted?     
    !uistate.isError?
    !uistate.showConfirmationMessage ?
    <Modal.Body>
        <ul className='list-unstyled card'>
            <li className='list-style-none'> <span className='text-green fw-bold'>Nom : &nbsp;</span>   
                {uistate.privillege.name}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Securable : &nbsp;</span>   
            {uistate.privillege.securable}</li>

           
                
        </ul>
        <div className='d-flex flex-row justify-content-between col-11'>
        
            <Link  className='col-4 mx-2 btn btn-outline-warning' to={"/previllege/access/"+uistate.privillege.id.toString()+""}>
               <FontAwesomeIcon icon={faKey} />  Access
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
            <p className='text-center'>La suppression d'un privillège est définitive </p>
            <div className='d-flex flex-row justify-content-between col-11'>
            <Button variant='secondary' className='col-6 mx-2' onClick={()=>{
                dispatch(initialize());
            }}>
               <FontAwesomeIcon icon={faXmark}  />  Annuler
            </Button>
            <Button variant='primary' className='col-6 mx-2' onClick={async ()=>{
                    try {
                        const payload = await deletePrivillege(uistate.privillege.id).unwrap();
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

export default DetailsPrivillegeModal
