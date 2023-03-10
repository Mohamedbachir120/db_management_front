import {  useDeleteProjectMutation } from '../../../../features/project/project'
import { faList , faEdit , faDatabase, faPerson ,faEraser, faCheck, faXmark, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import  { ProjectUiState, initialize, setDeleted,showEdit , setError, showConfirmationMessage, hideDetail, showLinkedDB } from '../../../../features/project/project-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'
import { Link } from 'react-router-dom'

function DetailsProjectModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{projectUi:ProjectUiState}) => state.projectUi);
    const dispatch = useAppDispatch();

    const [deleteProject,{isLoading}] = useDeleteProjectMutation();
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showDetail} onHide={handleClose}   size="xl" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faList} /> Détails Projet</Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.isDeleted?     
    !uistate.isError?
    !uistate.showConfirmationMessage ?
    <Modal.Body>
        <ul className='list-unstyled card'>
            <li className='list-style-none'> <span className='text-green fw-bold'>Name : &nbsp;</span>   
                {uistate.project.name}</li>

            <li className='list-style-none'> <span className='text-green fw-bold'>Description : &nbsp;</span>   
            {uistate.project.description}</li>

                
        </ul>
        <div className='d-flex flex-row justify-content-around  col-11'>
         
            
            <div className='col-2 mx-1'>
                
                <Link className='btn btn-outline-primary col-12' to={"/project/databases/"+uistate.project.id.toString()}>
                    <FontAwesomeIcon icon={faDatabase} /> Databases
                </Link>
            </div>
            <div className='col-2 mx-1'>
                
                <Link className='btn btn-outline-info  col-12' to={"/project/populations/"+uistate.project.id.toString()}>
                    <FontAwesomeIcon icon={faPeopleGroup} /> Populations
                </Link>
            </div>
            <div className='col-2 mx-1'>
                
                <Link className='btn btn-outline-secondary col-12' to={"/project/responsables/"+uistate.project.id.toString()}>
                    <FontAwesomeIcon icon={faPerson} /> Responsables
                </Link>
            </div>
            <Button variant='outline-success' className='col-2 mx-2' onClick={()=>{
                    dispatch(hideDetail());
                    dispatch(showEdit());
            }}>
               <FontAwesomeIcon icon={faEdit} />  Modifier
            </Button>
            <Button variant='outline-danger' className='col-2 mx-2' onClick={
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
            <p className='text-center'>La suppression d'un project , supprimera tous les objets liés Linked Project ,BDD, Users , Accès .. </p>
            <div className='d-flex flex-row justify-content-between col-11'>
            <Button variant='secondary' className='col-6 mx-2' onClick={()=>{
                dispatch(initialize());
            }}>
               <FontAwesomeIcon icon={faXmark}  />  Annuler
            </Button>
          
            <Button variant='primary' className='col-6 mx-2' onClick={async ()=>{
                  try {
                    const payload = await deleteProject(uistate.project.id).unwrap();
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

export default DetailsProjectModal
