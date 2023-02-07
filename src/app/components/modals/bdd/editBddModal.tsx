import React from 'react'
import { Bdd, useUpdateBddMutation } from '../../../../features/bdd/bdd'
import { faLink   } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import  { BddUiState, initialize,setCreated, setError, setName, setStatus,setEngine,setCreationDate,setServer,setSgbd, initServer } from '../../../../features/bdd/bdd-ui'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'
import Loader from '../../Loader'
import { Server, useFetchServersQuery } from '../../../../features/serveur/serveur';
import { Sgbd, useFetchSgbdsQuery } from '../../../../features/sgbd/sgbd';
import { initSgbd } from '../../../../features/sgbd/sgbd-ui'


function EditBddModal({refetch}:{refetch:()=>void}) {
  const uistate = useAppSelector((state:{bddUi:BddUiState}) => state.bddUi);
  const dispatch = useAppDispatch();
  const [keyword] = React.useState("all");
  const [page] = React.useState(1);
    const [updateBdd,{isLoading}] = useUpdateBddMutation();
    
    
    const { data,isFetching } = useFetchServersQuery({keyword,page});

    const { currentData } = useFetchSgbdsQuery({keyword,page});
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uistate.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faLink} /> Modifier bdd : {uistate.bdd.name}</Modal.Title>
      
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
                    placeholder='Nom de la bdd'
                    value={uistate.bdd.name}
                    onChange={(e)=>{
                        dispatch(setName(e.target.value));
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Status du linked server'
                    value={uistate.bdd.status}
                    onChange={(e)=>{
                     dispatch(setStatus(e.target.value));
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label>Engine</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Engine'
                    value={uistate.bdd.engine}
                    onChange={(e)=>{
                    dispatch(setEngine(e.target.value))  ;
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label>Date de création</Form.Label>
                <Form.Control
                    type="date"
                    placeholder='Date de création'
                    value={uistate.bdd.creation_date}
                    onChange={(e)=>{
                     dispatch(setCreationDate(e.target.value)) ;
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label> Sgbd</Form.Label>
                <Form.Select onChange={(e)=>{
                      setSgbd(parseInt(e.target.value));
                      
                }}>
                  { 
                  currentData?.data.map((sgbd:Sgbd)=>{
                    if(sgbd.id == uistate.bdd.sgbd_id){

                      return (<option value={sgbd.id} key={sgbd.id} selected >{sgbd.name}</option>)
                    }else{
                      return (<option value={sgbd.id} key={sgbd.id}  >{sgbd.name}</option>)

                    }
                  })
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Serveur</Form.Label>
                <Form.Select  onChange={(e)=>{
                      dispatch(setServer(parseInt(e.target.value)));
                      
                }}>

                  { 
                  
                  data?.data.map((server:Server)=>{
                    if(server.id == uistate.bdd.server_id){

                    return (<option value={server.id} key={server.id} selected> {server.dns}</option>)
                    }else{
                    return (<option value={server.id} key={server.id} > {server.dns}</option>)

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
            const bdd = new Bdd(uistate.bdd.id,uistate.bdd.name,uistate.bdd.engine,uistate.bdd.status,uistate.bdd.creation_date,initServer,initSgbd,uistate.bdd.server_id ,uistate.bdd.sgbd_id);
          try {
            const payload =  await updateBdd(bdd).unwrap();
            dispatch(setCreated());
            refetch();
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

export default EditBddModal
