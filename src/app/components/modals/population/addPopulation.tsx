import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { PopulationUiState, hide, initialize, setCreated, setError } from '../../../../features/population/population-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Population, useStorePopulationMutation ,  } from '../../../../features/population/population';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';

function AddPopulationModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{populationUi:PopulationUiState}) => state.populationUi);

    const [designation, setDesignation] = React.useState('');
    const [version, setVersion] = React.useState('');



  const [storePopulation,{isLoading,isError,isSuccess,reset}] = useStorePopulationMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>


    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faPeopleGroup} /> Ajouter une nouvelle population</Modal.Title>
      </Modal.Header>
        {
        !uistate.isError?    
        !isLoading ?
        !uistate.created ? (
             <div>
      <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Designation</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='designation'
                    value={designation}
                    onChange={(e)=>{
                        setDesignation(e.target.value);
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
            const population = new Population(0,designation,[]);
              try {
                const payload = await storePopulation(population).unwrap();

                dispatch(setCreated());
                refetch();
              } catch (error) {
                
                dispatch(setError()) ;
              }
              setTimeout(() => {
                  dispatch(initialize());
                  
              }, 2000);
             
           
            
            setDesignation("");
            setVersion("")

           
            
            
        }}>
          Valider
        </button>
      </Modal.Footer>
    </div>  ):(
        <SuccessMessage message={"Accès crée avec succès"} />
    
    )  :(
    <Loader />) :(<ErrorMessage message="Opération échouée" />)}
    </Modal>
  </div>
  )
}

export default AddPopulationModal
