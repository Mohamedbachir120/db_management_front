import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { ResponsableUiState, hide, initialize, setCreated, setError } from '../../../../features/responsable/responsable-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Responsable, useStoreResponsableMutation ,  } from '../../../../features/responsable/responsable';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';

function AddResponsableModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{responsableUi:ResponsableUiState}) => state.responsableUi);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');




  const [storeResponsable,{isLoading,isError,isSuccess,reset}] = useStoreResponsableMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>


    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faPerson} /> Ajouter un nouveau responsable</Modal.Title>
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
                <Form.Label>Email </Form.Label>
                <Form.Control
                    type="email"
                    placeholder='email'
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    />
             </Form.Group> 
             <Form.Group>
                <Form.Label>Phone </Form.Label>
                <Form.Control
                    type="tel"
                    placeholder='phone'
                    value={phone}
                    onChange={(e)=>{
                        setPhone(e.target.value);
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
            const responsable = new Responsable(0,name, email,phone,[]);
            console.log(responsable);
            
            try {
              const payload = await storeResponsable(responsable).unwrap();
                dispatch(setCreated());
                refetch();
            } catch (error) {
              dispatch(setError()) ;
            }
             
           
             setTimeout(() => {
              dispatch(initialize());
              
          }, 2000);
            setName("");
            setEmail("")

           
            
            
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

export default AddResponsableModal
