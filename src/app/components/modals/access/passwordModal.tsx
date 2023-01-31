import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { AccessUiState, hide, initialize, setCreated, setError } from '../../../../features/access/access-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Access, useDecryptPasswordMutation   } from '../../../../features/access/access';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';

function PasswordModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{accessUi:AccessUiState}) => state.accessUi);

    const [pwd, setPwd] = React.useState('');



    const [decryptPassword,{isLoading,isError,isSuccess,reset}] = useDecryptPasswordMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>


    <Modal show={uistate.showPassword} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faKey} /> Vérifier votre identité</Modal.Title>
      </Modal.Header>
        {
        !uistate.isError?    
        !isLoading ?
        !uistate.created ? (
             <div>
      <Modal.Body>
        <Form>
           
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
            
               
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <button className="btn bg-primaire" onClick={async () => {
            
            try {
              const payload = await decryptPassword({id:uistate.access.id,password:pwd}).unwrap();
              if(payload.success == true) {
              var TempText = document.createElement("input");
              TempText.value = payload.password;
              document.body.appendChild(TempText);
              TempText.select();
              
              document.execCommand("copy");
              document.body.removeChild(TempText);
                dispatch(setCreated());
                refetch();
              }else{
              dispatch(setError()) ;

              }
            } catch (error) {
              
              dispatch(setError()) ;

            }
            setTimeout(() => {
              dispatch(initialize());
              
          }, 2000);
             
           
            
            setPwd("")

           
            
            
        }}>
          Valider
        </button>
      </Modal.Footer>
    </div>  ):(
        <SuccessMessage message={"Mot de passe copié dans votre presse papier"} />
    
    )  :(
    <Loader />) :(<ErrorMessage message="Mot de passe incorrecte" />)}
    </Modal>
  </div>
  )
}

export default PasswordModal
