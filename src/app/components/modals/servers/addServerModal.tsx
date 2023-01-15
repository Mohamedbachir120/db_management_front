import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { ServerUiState, hide, initialize, setCreated, setError } from '../../../../features/serveur/server-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Server, useStoreServerMutation ,  } from '../../../../features/serveur/serveur';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';

function AddServerModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{serverUi:ServerUiState}) => state.serverUi);

    const [dns, setDns] = React.useState('');
    const [ip, setIp] = React.useState('');
    const [port, setPort] = React.useState('');
    const [instance, setInstance] = React.useState('');
    const [osVersion, setOsVersion] = React.useState('');


  const [storeServer,{isLoading,isError,isSuccess,reset}] = useStoreServerMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>


    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faServer} /> Ajouter un nouveau serveur</Modal.Title>
      </Modal.Header>
        {
        !uistate.isError?    
        !isLoading ?
        !uistate.created ? (
             <div>
      <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>DNS</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='example.naftal.local'
                    value={dns}
                    onChange={(e)=>{
                        setDns(e.target.value);
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>IP</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='10.96.X.X'
                    value={ip}
                    onChange={(e)=>{
                        setIp(e.target.value);
                    }}
                    />
             </Form.Group> 
             <Form.Group>
                <Form.Label>OS Version</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Windows server 2019"
                    value={osVersion}
                    
                    onChange={(e)=>{
                        setOsVersion(e.target.value);
                    }}
                    />
             </Form.Group>  
             <Form.Group>
                <Form.Label>Instance name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="instance name"
                    value={instance}
                    onChange={(e)=>{
                        setInstance(e.target.value);
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Port</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="1433"
                    value={port} 
                    onChange={(e)=>{
                        setPort(e.target.value);
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
            const server = new Server(0,dns,ip,osVersion,instance,port);
            try {
              const payload = await storeServer(server);
              dispatch(setCreated());
              refetch();
            } catch (error) {
              dispatch(setError()) ;
              
            }
            setTimeout(() => {
              dispatch(initialize());
              
            }, 2000);
            
           
            
            setDns("");
            setInstance("")
            setPort("")
            setOsVersion("")
            setIp("")

           
            
            
        }}>
          Valider
        </button>
      </Modal.Footer>
    </div>  ):(
        <SuccessMessage message={"Serveur crée avec succès"} />
    
    )  :(
    <Loader />) :(<ErrorMessage message="Opération échouée" />)}
    </Modal>
  </div>
  )
}

export default AddServerModal
