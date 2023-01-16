import React from 'react'
import { Button,Form,Modal } from 'react-bootstrap'
import { BddUiState, hide, initServer, initialize, setCreated, setError } from '../../../../features/bdd/bdd-ui';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Bdd, useStoreBddMutation ,  } from '../../../../features/bdd/bdd';
import SuccessMessage from '../../messages/SuccessMessage';
import Loader from '../../Loader';
import ErrorMessage from '../../messages/ErrorMessage';
import { ListResponse, Server, useFetchServersQuery } from '../../../../features/serveur/serveur';
import { Sgbd, useFetchSgbdsQuery } from '../../../../features/sgbd/sgbd';
import { initSgbd } from '../../../../features/sgbd/sgbd-ui';

function AddBddModal({refetch}:{refetch:()=>void}) {
    const uistate = useAppSelector((state:{bddUi:BddUiState}) => state.bddUi);


    const [keyword, setKeyword] = React.useState("all");
    const [page,setPage] = React.useState(1);

    const [name, setName] = React.useState('');
    const [engine, setEngine] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [creationDate,setCreationDate] = React.useState('');
    const [server,setServer] = React.useState(0);
    const [sgbd,setSgbd] = React.useState(0);

    
    const { data,isFetching } = useFetchServersQuery({keyword,page});

    const { currentData } = useFetchSgbdsQuery({keyword,page});
  
    
  const [storeBdd,{isLoading,isError,reset}] = useStoreBddMutation();


    const dispatch = useAppDispatch();

    function handleClose(){
        dispatch(initialize());
    }
  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>

  
    
    <Modal show={uistate.show} onHide={handleClose}   size="lg" centered>
      <Modal.Header className='bg-secondaire' closeButton>
        <Modal.Title ><FontAwesomeIcon icon={faDatabase} /> Ajouter une nouvelle base de données</Modal.Title>
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
                    placeholder='Nom bdd'
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>Engine</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Engine bdd'
                    value={engine}
                    onChange={(e)=>{
                      setEngine(e.target.value);
                    }}
                    />
             </Form.Group>
             <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Status'
                    value={status}
                    onChange={(e)=>{
                      setStatus(e.target.value);
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
                <Form.Label>Serveur Server</Form.Label>
                <Form.Select onChange={(e)=>{
                      setServer(parseInt(e.target.value));
                      
                }}>
                  { 
                    
                    
                  data?.data.map((server:Server)=>{
                    return (<option value={server.id} key={server.id}>{server.dns}</option>)
                  })

                    }
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sgbd</Form.Label>
                <Form.Select  onChange={(e)=>{
                      setSgbd(parseInt(e.target.value));
                      
                }}>

                  { 
                  currentData?.data.map((sgbd:Sgbd)=>{
                    return (<option value={sgbd.id} key={sgbd.id}>{sgbd.name}</option>)
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
          
          if(server == 0 ){
            setServer(data?.data[0].id!);

          }
          if(sgbd == 0 ){
            setSgbd(currentData?.data[0]?.id!);
          }
         
            const bdd = new Bdd(0,name,engine,status,creationDate,initServer,initSgbd,server ,sgbd);
         
          try {
            const payload = await storeBdd(bdd).unwrap();
            dispatch(setCreated());
              refetch();
          } catch (error) {
            dispatch(setError()) ;
            
          }
          setTimeout(() => {
            dispatch(initialize());
            
        }, 2000);
             
           
            
            setName("");
            setEngine("")
            setStatus("")
            setCreationDate("")
          
           
            
            
        }}>
          Valider
        </button>
      </Modal.Footer>
    </div>  ):(
        <SuccessMessage message={"Bdd crée avec succès"} />
    
    )  :(
    <Loader />) :(<ErrorMessage message="Opération échouée" />)}
    </Modal>
  </div>
  )
}

export default AddBddModal
