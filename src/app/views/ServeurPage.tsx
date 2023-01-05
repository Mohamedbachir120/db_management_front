import React from 'react'
import  Navbar  from './../components/Navbar'
import Header from '../components/Header'
import { useFetchServersQuery,Server } from '../../features/serveur/serveur' 
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import AddServerModal from '../components/modals/addServerModal';
import DetailsServerModal from '../components/modals/detailsServerModal';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ServerUiState, show, showDetail, showEdit } from '../../features/serveur/server-ui';
import EditServerModal from '../components/modals/editServerModal';

export default function ServeurPage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);

  const { data,isFetching,refetch } = useFetchServersQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"serveur"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green">Serveurs</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Nom du serveur ,IP , PORT ..." onChange={(e)=>{
              setKeyword(e.target.value);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un nouveau serveur</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>DNS</td>
                <td>IP</td>
                <td>Instance name</td>
                <td>Port</td>
                <td>OS</td>
                <td>Nombre de bdd</td>    

                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((server:Server) => {
             

              return (<tr key={server.id}>
                <td>{server.dns}</td>
                <td>{server.ip}</td>
                <td>{server.instance_name}</td>
                <td>{server.port}</td>
                <td>{server.OSversion}</td>
                <td>{server.bdds_count}</td>
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(server));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton />)} 
            

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
          
        <AddServerModal  refetch={CustomRefetch} />
        <DetailsServerModal refetch={CustomRefetch} />  
        <EditServerModal refetch={CustomRefetch} />

    </div>
    
  )
}
