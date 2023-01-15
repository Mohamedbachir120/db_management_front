import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { ProjectUiState, hide, initialize, setCreated, setError } from '../../../../features/project/project-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Project, useStoreProjectMutation ,  } from '../../../../features/project/project';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';

function AddProjectModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{projectUi:ProjectUiState}) => state.projectUi);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');



  const [storeProject,{isLoading,isError,isSuccess,reset}] = useStoreProjectMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>


    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faList} /> Ajouter un nouveau projet</Modal.Title>
      </Modal.Header>
        {
        !uistate.isError?    
        !isLoading ?
        !uistate.created ? (
             <div>
      <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='name'
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Description </Form.Label>
                <Form.Control
                    type="text"
                    placeholder='description'
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value);
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
            const project = new Project(0,name, description);
            try {
                const payload = await storeProject(project).unwrap();
                dispatch(setCreated());
                refetch();
            } catch (error) {
                dispatch(setError()) ;
              
            }
            setTimeout(() => {
              dispatch(initialize());
              
          }, 2000);
           
           
            
            setName("");
            setDescription("")

           
            
            
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

export default AddProjectModal
