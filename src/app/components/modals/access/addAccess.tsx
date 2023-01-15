import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { AccessUiState, hide, initialize, setCreated, setError } from '../../../../features/access/access-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Access, useStoreAccessMutation ,  } from '../../../../features/access/access';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';

function AddAccessModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{accessUi:AccessUiState}) => state.accessUi);

    const [username, setUsername] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [auth_type, setAuth_type] = React.useState(0);



  const [storeAccess,{isLoading,isError,isSuccess,reset}] = useStoreAccessMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>


    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faKey} /> Ajouter un nouveau access</Modal.Title>
      </Modal.Header>
        {
        !uistate.isError?    
        !isLoading ?
        !uistate.created ? (
             <div>
      <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='username'
                    value={username}
                    onChange={(e)=>{
                        setUsername(e.target.value);
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Password </Form.Label>
                <Form.Control
                    type="password"
                    placeholder=''
                    value={pwd}
                    onChange={(e)=>{
                        setPwd(e.target.value);
                    }}
                    />
             </Form.Group> 
             <Form.Group>
                <Form.Label>Auth type</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Auth type"
                    value={auth_type}
                    
                    onChange={(e)=>{
                        setAuth_type(parseInt(e.target.value));
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
            const access = new Access(0,username, pwd,auth_type);
            
            try {
              const payload = await storeAccess(access).unwrap();
              dispatch(setCreated());
              refetch();
            } catch (error) {
              
              dispatch(setError()) ;

            }
            setTimeout(() => {
              dispatch(initialize());
              
          }, 2000);
             
           
            
            setUsername("");
            setAuth_type(0)
            setPwd("")

           
            
            
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

export default AddAccessModal
