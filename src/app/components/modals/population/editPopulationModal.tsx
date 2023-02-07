import React from 'react'
import { Population, useDeletePopulationMutation, useUpdatePopulationMutation } from '../../../../features/population/population'
import { faPeopleGroup , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import populationUi, { PopulationUiState, initialize, setDesignation,setCreated, setDeleted, setError, showConfirmationMessage } from '../../../../features/population/population-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function EditPopulationModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{populationUi:PopulationUiState}) => state.populationUi);
    const dispatch = useAppDispatch();

    const [updatePopulation,{isLoading}] = useUpdatePopulationMutation();
    
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faPeopleGroup} /> Modifier population : {uistate.population.designation}</Modal.Title>
      
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
                <Form.Label>Designation</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='example.naftal.local'
                    
                    value={uistate.population.designation}
                    onChange={(e)=>{
                       dispatch(setDesignation(e.target.value)) ;
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
          const population = new Population(uistate.population.id,uistate.population.designation,[]);
          try {
            const payload = await updatePopulation(population).unwrap();
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

export default EditPopulationModal
