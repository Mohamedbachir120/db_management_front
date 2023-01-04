import React from 'react'
import  Navbar  from './../components/Navbar'
import Header from '../components/Header'
import { useFetchServersQuery,Server } from '../../features/serveur/serveur' 
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';

export default function ServeurPage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);

  const { data,isFetching } = useFetchServersQuery({keyword,page});



  
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
            <Button variant='primary'> <FontAwesomeIcon icon={faAdd} /> Ajouter un nouveau serveur</Button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-green'>
                <td>DNS</td>
                <td>IP</td>
                <td>Instance name</td>
                <td>Port</td>
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
                <td>{server.bdds_count}</td>
                <td><Button variant='primary'>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton />)}

          </table>
          <div className='d-flex flex-row justify-content-start'>
          
          {           
            // console.log(data?.links)
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


      
    </div>
  )
}
