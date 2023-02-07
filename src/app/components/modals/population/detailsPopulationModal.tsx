import {  useDeletePopulationMutation } from '../../../../features/population/population'
import { faPeopleGroup , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import  { PopulationUiState, initialize, setDeleted,showEdit , setError, showConfirmationMessage, hideDetail } from '../../../../features/population/population-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function DetailsPopulationModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{populationUi:PopulationUiState}) => state.populationUi);
    const dispatch = useAppDispatch();

    const [deletePopulation,{isLoading,isError,isSuccess,reset}] = useDeletePopulationMutation();
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showDetail} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faPeopleGroup} /> Détails Population</Modal.Title>
      
    </Modal.Header>
    {
    !isLoading?     
    !uistate.isDeleted?     
    !uistate.isError?
    !uistate.showConfirmationMessage ?
    <Modal.Body>
        <ul className='list-unstyled card'>
            <li className='list-style-none'> <span className='text-green fw-bold'>Designation : &nbsp;</span>   
                {uistate.population.designation}</li>
            <li className='list-style-none'> 
                <span className='text-green fw-bold'>Projets : &nbsp;</span>  

                <ol >
                   {uistate.population.projects?.length > 0 ? uistate.population.projects?.map((project)=>(<li key={project.id}>
                        {project.name}
                    </li>)) : (<span>Aucun projet affecté</span>) } 
                </ol>
                </li>    

        

                
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
            <p className='text-center'>La suppression d'un population , supprimera tous les objets liés Linked Population ,BDD, Users , Accès .. </p>
            <div className='d-flex flex-row justify-content-between col-11'>
            <Button variant='secondary' className='col-6 mx-2' onClick={()=>{
                dispatch(initialize());
            }}>
               <FontAwesomeIcon icon={faXmark}  />  Annuler
            </Button>
            <Button variant='primary' className='col-6 mx-2' onClick={async ()=>{
                        try {
                            const payload = await   deletePopulation(uistate.population.id).unwrap();
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

export default DetailsPopulationModal
