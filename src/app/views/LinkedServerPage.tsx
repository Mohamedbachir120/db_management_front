import React from 'react'
import  Navbar  from './../components/Navbar'
import Header from '../components/Header'
import { useFetchServersQuery,Server } from '../../features/serveur/serveur' 
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faLink } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';

import { useAppDispatch } from '../hooks';
import {  show, showDetail } from '../../features/linked-server/linked-server-ui';
import {  LinkedServer, useFetchLinkedServersQuery } from '../../features/linked-server/linked-server';
import AddLinkedServerModal from '../components/modals/linked-server/addLinkedServer';
import DetailsLinkedServerModal from '../components/modals/linked-server/detailsLinkedServerModal';
import EditLinkedServerModal from '../components/modals/linked-server/editLinkedServerModal';

export default function LinkedServerPage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);
  

  const { data,isFetching,refetch } = useFetchLinkedServersQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"linked-server"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green"><FontAwesomeIcon icon={faLink} /> Linked servers</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Nom du linked serveur ,type , Méthode de création ..." onChange={(e)=>{
              setKeyword(e.target.value);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un nouveau linked serveur</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>Nom</td>
                <td>Type</td>
                <td>Méthode de création</td>
                <td>Source</td>
                <td>Destination</td>
                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((linked_server:LinkedServer) => {
             

              return (<tr key={linked_server.id}>
                <td>{linked_server.name}</td>
                <td>{linked_server.type}</td>
                <td>{linked_server.create_method}</td>
                <td>{linked_server.source.dns}</td>
                <td>{linked_server.destination.dns}</td>
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(linked_server));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton  data={6} />)} 
            

          </table>
          <div className='d-flex flex-row justify-content-start'>
                    {           
            data?.links.map((link, index) => {
              if(link.label.charAt(0) != "N" && link.url != null){
              if(link.active ) {
              
                return <button key={index} className="btn btn-primary mx-2" 
                onClick={(e)=> setPage(parseInt(link.label))} >{index}</button>
              }
              return <button key={index} className="btn btn-secondary mx-2"
              onClick={(e)=> setPage(parseInt(link.label))}>{index}</button>
            }
            })
            
          }
          </div>
        </div>
        </div>
          
         <AddLinkedServerModal  refetch={CustomRefetch} />
         <DetailsLinkedServerModal refetch={CustomRefetch} />  
         <EditLinkedServerModal refetch={CustomRefetch} />

    </div>
    
  )
}
