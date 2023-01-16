import React from 'react'
import  Navbar  from '../components/Navbar'
import Header from '../components/Header'
import { useFetchServersQuery,Server } from '../../features/serveur/serveur' 
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faDatabase } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';

import { useAppDispatch } from '../hooks';
import {  show, showDetail } from '../../features/bdd/bdd-ui';
import {  Bdd, useFetchBddsQuery } from '../../features/bdd/bdd';
import AddBddModal from '../components/modals/bdd/addBdd';
import DetailsBddModal from '../components/modals/bdd/detailsBddModal';
import EditBddModal from '../components/modals/bdd/editBddModal';

export default function BddPage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);
  

  const { data,isFetching,refetch } = useFetchBddsQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"bdd"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green"><FontAwesomeIcon icon={faDatabase} /> BDD</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Nom de la base de donnés status ..." onChange={(e)=>{
              setKeyword(e.target.value);
              setPage(1);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter une nouvele base de données</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>Nom</td>
                <td>Serveur</td>
                <td>Sgbd</td>
                <td>Status</td>
                <td>Engine</td>
                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((bdd:Bdd) => {
             

              return (<tr key={bdd.id}>
                <td>{bdd.name}</td>
                <td>{bdd.server.dns}</td>
                <td>{bdd.sgbd.name}</td>
                <td>{bdd.status}</td>
                <td>{bdd.engine}</td>
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(bdd));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton  data={6} />)} 
            

          </table>
          <div className='d-flex flex-row justify-content-start'>
                    {        
                       
            data?.links.map((link, index) => {
              if(link.label.charAt(0) != "N" && link.label.charAt(0) != "&" && link.url != null){
              if(link.active ) {
              
                return <button key={index} className="btn btn-primary mx-2" 
                onClick={(e)=> setPage(parseInt(link.label))} >{index == 0 ? index +1 : index }</button>
              }
              return <button key={index} className="btn btn-secondary mx-2"
              onClick={(e)=> setPage(parseInt(link.label))}>{index == 0 ? index +1 : index  }</button>
            }
            })
            
          }
          </div>
        </div>
        </div>
          
         <AddBddModal  refetch={CustomRefetch} />
         <DetailsBddModal refetch={CustomRefetch} />  
         <EditBddModal refetch={CustomRefetch} />

    </div>
    
  )
}
