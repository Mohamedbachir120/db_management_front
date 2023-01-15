import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { SgbdUiState, hide, initialize, setCreated, setError } from '../../../../features/sgbd/sgbd-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Sgbd, useStoreSgbdMutation ,  } from '../../../../features/sgbd/sgbd';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';

function AddSgbdModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{sgbdUi:SgbdUiState}) => state.sgbdUi);

    const [name, setName] = React.useState('');
    const [version, setVersion] = React.useState('');



  const [storeSgbd,{isLoading,isError,isSuccess,reset}] = useStoreSgbdMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>


    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faDatabase} /> Ajouter un nouveau sgbd</Modal.Title>
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
                <Form.Label>Version </Form.Label>
                <Form.Control
                    type="version"
                    placeholder='version'
                    value={version}
                    onChange={(e)=>{
                        setVersion(e.target.value);
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
            const sgbd = new Sgbd(0,name, version);
              try {
                const payload = await storeSgbd(sgbd).unwrap();

                dispatch(setCreated());
                refetch();
              } catch (error) {
                
                dispatch(setError()) ;
              }
              setTimeout(() => {
                  dispatch(initialize());
                  
              }, 2000);
             
           
            
            setName("");
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

export default AddSgbdModal
