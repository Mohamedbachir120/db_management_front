import { Project,  useUpdateProjectMutation } from '../../../../features/project/project'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import  { ProjectUiState, initialize, setName,setDescription,setCreated, setDeleted, setError, showConfirmationMessage, showLinkedDB } from '../../../../features/project/project-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'

function EditProjectModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{projectUi:ProjectUiState}) => state.projectUi);
    const dispatch = useAppDispatch();

    const [updateProject,{isLoading}] = useUpdateProjectMutation();
    
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faList} /> Modifier project : {uistate.project.name}</Modal.Title>
      
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
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='example.naftal.local'
                    
                    value={uistate.project.name}
                    onChange={(e)=>{
                       dispatch(setName(e.target.value)) ;
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='10.96.X.X'
                    value={uistate.project.description}
                    onChange={(e)=>{
                       dispatch(setDescription(e.target.value));
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
          const project = new Project(uistate.project.id,uistate.project.name,uistate.project.description);

            try {
              const payload = await updateProject(project).unwrap();
              dispatch(setCreated());
              refetch()
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

export default EditProjectModal
