import React from 'react'
import  Navbar  from '../components/Navbar'
import Header from '../components/Header'
import { useFetchResponsablesQuery,Responsable } from '../../features/responsable/responsable' 
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPerson } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import { useAppDispatch } from '../hooks';
import {  show, showDetail } from '../../features/responsable/responsable-ui';
import EditServerModal from '../components/modals/responsable/editResponsableModal';
import AddResponsableModal from '../components/modals/responsable/addResponsable';
import DetailsResponsableModal from '../components/modals/responsable/detailsResponsableModal';
import EditResponsableModal from '../components/modals/responsable/editResponsableModal';


export default function ResponsablePage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);

  const { data,isFetching,refetch } = useFetchResponsablesQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"responsable"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green"><FontAwesomeIcon icon={faPerson} /> Responsable</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Nom , version ..." onChange={(e)=>{
              setKeyword(e.target.value);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un responsable</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>Nom</td>
                <td>Email</td>
                <td>Phone</td>

                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((responsable:Responsable) => {
             

              return (<tr key={responsable.id}>
                <td>{responsable.name}</td>
                <td>{responsable.email}</td>
                <td>{responsable.phone}</td>

               
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(responsable));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton data={4} />)} 
            

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
          
       <AddResponsableModal  refetch={CustomRefetch} />
       <DetailsResponsableModal refetch={CustomRefetch} />  
       <EditResponsableModal refetch={CustomRefetch} /> 

    </div>
    
  )
}
