import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { PrivillegeUiState, initialize, setCreated, setError } from '../../../../features/privillege/privillege-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLock } from '@fortawesome/free-solid-svg-icons';
import { Privillege, useStorePrivillegeMutation ,  } from '../../../../features/privillege/privillege';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';


function AddPrivillegeModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{privillegeUi:PrivillegeUiState}) => state.privillegeUi);


    const [name, setName] = React.useState('');
    const [securable, setSecurable] = React.useState('');
  

    
  
    
  const [storePrivillege,{isLoading}] = useStorePrivillegeMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>

  
    
    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faLock} /> Ajouter un nouveau privillège</Modal.Title>
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
                    placeholder='Nom privillege'
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Securable</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Securable privillege'
                    value={securable}
                    onChange={(e)=>{
                      setSecurable(e.target.value);
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
          
         
         
            const privillege = new Privillege(0,name,securable,0);
         
          try {
            const payload = await storePrivillege(privillege).unwrap();
            dispatch(setCreated());
              refetch();
          } catch (error) {
            dispatch(setError()) ;
            
          }
          setTimeout(() => {
            dispatch(initialize());
            
        }, 2000);
             
           
            
            setName("");
            setSecurable("")
          
          
           
            
            
        }}>
          Valider
        </button>
      </Modal.Footer>
    </div>  ):(
        <SuccessMessage message={"Privillege crée avec succès"} />
    
    )  :(
    <Loader />) :(<ErrorMessage message="Opération échouée" />)}
    </Modal>
  </div>
  )
}

export default AddPrivillegeModal
