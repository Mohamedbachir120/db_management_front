import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { LinkedServerUiState, hide, initServer, initialize, setCreated, setError } from '../../../../features/linked-server/linked-server-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faCheck } from '@fortawesome/free-solid-svg-icons';
import { LinkedServer, useStoreLinkedServerMutation ,  } from '../../../../features/linked-server/linked-server';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';
import { ListResponse, Server, useFetchServersQuery } from '../../../../features/serveur/serveur';
import { Access, useFetchAccesssQuery } from '../../../../features/access/access';

function AddLinkedServerModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{linkedServerUi:LinkedServerUiState}) => state.linkedServerUi);


    const [keyword, setKeyword] = React.useState("all");
    const [page,setPage] = React.useState(1);

    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('');
    const [createMethod, setCreateMethod] = React.useState('');
    const [creationDate,setCreationDate] = React.useState('');
    const [source,setSource] = React.useState(0);
    const [destination,setDestination] = React.useState(0);
    const [access,setAccess] = React.useState(0);

    
    const { data,isFetching } = useFetchServersQuery({keyword,page});

    const { currentData } = useFetchAccesssQuery({keyword,page});
  
    
  const [storeLinkedServer,{isLoading,isError,reset}] = useStoreLinkedServerMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>

  
    
    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faServer} /> Ajouter un nouveau Linked server</Modal.Title>
      </Modal.Header>
        {
        !uistate.isError?    
        !isLoading ?
        !uistate.created ? (
             <div>
      <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Nom du linked server'
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Type du linked server'
                    value={type}
                    onChange={(e)=>{
                      setType(e.target.value);
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label>Méthode de création</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Méthode de création'
                    value={createMethod}
                    onChange={(e)=>{
                      setCreateMethod(e.target.value);
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label>Date de création</Form.Label>
                <Form.Control
                    type="date"
                    placeholder='Date de création'
                    value={creationDate}
                    onChange={(e)=>{
                      setCreationDate(e.target.value);
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label>Serveur Source</Form.Label>
                <Form.Select onChange={(e)=>{
                      setSource(parseInt(e.target.value));
                      
                }}>
                  { 
                  data?.map((server:Server)=>{
                    return (<option value={server.id} key={server.id}>{server.dns}</option>)
                  })
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Serveur Destination</Form.Label>
                <Form.Select  onChange={(e)=>{
                      setDestination(parseInt(e.target.value));
                      
                }}>

                  { 
                  data?.map((server:Server)=>{
                    return (<option value={server.id} key={server.id}>{server.dns}</option>)
                  })
                    }
                </Form.Select>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Accès</Form.Label>
                <Form.Select  onChange={(e)=>{
                      setAccess(parseInt(e.target.value));
                      
                }}>

                  { 
                  currentData?.map((access:Access)=>{
                    return (<option value={access.id} key={access.id}>{access.username}</option>)
                  })
                    }
                </Form.Select>
            </Form.Group> 
                  
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <button className="btn bg-primaire" onClick={async () => {
          if(source == 0 ){
            setSource(data[0]?.id);

          }
          if(destination == 0 ){
            setDestination(data[0]?.id);
          }
          if(access == 0 ){
            setAccess(currentData[0]?.id);
          }
            const server = new LinkedServer(0,name,createMethod,type,creationDate,initServer,initServer,source ,destination,access);
            
             await storeLinkedServer(server).then((e) => {
               
                if(e.data != null) {

                    dispatch(setCreated());
                    refetch();
                }else{
                   dispatch(setError()) ;
                }
                
                setTimeout(() => {
                    dispatch(initialize());
                    
                }, 2000);

             });
           
            
            setName("");
            setType("")
            setCreateMethod("")
            setCreationDate("")
          
           
            
            
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

export default AddLinkedServerModal
