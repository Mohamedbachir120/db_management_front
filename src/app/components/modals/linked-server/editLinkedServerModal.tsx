import React from 'react'
import { LinkedServer, useDeleteLinkedServerMutation, useUpdateLinkedServerMutation } from '../../../../features/linked-server/linked-server'
import { faLink , faEdit ,  faEraser, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import serverUi, { LinkedServerUiState, initialize,setCreated, setError, setName, setType,setAccess,setCreateMethod,setCreationDate,setDestination,setSource, initServer } from '../../../../features/linked-server/linked-server-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'
import { Server, useFetchServersQuery } from '../../../../features/serveur/serveur';
import { Access, useFetchAccesssQuery } from '../../../../features/access/access';


function EditLinkedServerModal({refetch}:{refetch:()=>void}) {
  const uistate = useAppSelector((state:{linkedServerUi:LinkedServerUiState}) => state.linkedServerUi);
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = React.useState("all");
  const [page,setPage] = React.useState(1);
    const [updateLinkedServer,{isLoading}] = useUpdateLinkedServerMutation();
    
    
    const { data,isFetching } = useFetchServersQuery({keyword,page});

    const { currentData } = useFetchAccesssQuery({keyword,page});
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faLink} /> Modifier linked-server : {uistate.server.name}</Modal.Title>
      
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
                    placeholder='Nom du linked server'
                    value={uistate.server.name}
                    onChange={(e)=>{
                        dispatch(setName(e.target.value));
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Type du linked server'
                    value={uistate.server.type}
                    onChange={(e)=>{
                     dispatch(setType(e.target.value));
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label>Méthode de création</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Méthode de création'
                    value={uistate.server.create_method}
                    onChange={(e)=>{
                    dispatch(setCreateMethod(e.target.value))  ;
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label>Date de création</Form.Label>
                <Form.Control
                    type="date"
                    placeholder='Date de création'
                    value={uistate.server.creation_date}
                    onChange={(e)=>{
                     dispatch(setCreationDate(e.target.value)) ;
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
                    if(server.id == uistate.server.source_id){

                      return (<option value={server.id} key={server.id} selected >{server.dns}</option>)
                    }else{
                      return (<option value={server.id} key={server.id}  >{server.dns}</option>)

                    }
                  })
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Serveur Destination</Form.Label>
                <Form.Select  onChange={(e)=>{
                      dispatch(setDestination(parseInt(e.target.value)));
                      
                }}>

                  { 
                  
                  data?.map((server:Server)=>{
                    if(server.id == uistate.server.destination_id){

                    return (<option value={server.id} key={server.id} selected> {server.dns}</option>)
                    }else{
                    return (<option value={server.id} key={server.id} > {server.dns}</option>)

                    }
                  })
                    }
                </Form.Select>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Accès</Form.Label>
                <Form.Select  onChange={(e)=>{
                      dispatch(setAccess(parseInt(e.target.value)));
                      
                }}>

                  { 
                  
                  currentData?.map((access:Access)=>{
                    if(access.id == uistate.server.access_id){

                      return (<option value={access.id} key={access.id} selected>{access.username}</option>)
                    }else{
                      return (<option value={access.id} key={access.id}>{access.username}</option>)

                    }
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
            const server = new LinkedServer(uistate.server.id,uistate.server.name,uistate.server.create_method,uistate.server.type,uistate.server.creation_date,initServer,initServer,uistate.server.source_id ,uistate.server.destination_id,uistate.server.access_id);
        
           await updateLinkedServer(server).then((e) => {
             
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

export default EditLinkedServerModal
