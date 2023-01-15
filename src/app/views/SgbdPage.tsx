import React from 'react'
import  Navbar  from '../components/Navbar'
import Header from '../components/Header'
import { useFetchSgbdsQuery,Sgbd } from '../../features/sgbd/sgbd' 
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faDatabase } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import { useAppDispatch } from '../hooks';
import {  show, showDetail } from '../../features/sgbd/sgbd-ui';
import EditServerModal from '../components/modals/sgbd/editSgbdModal';
import AddSgbdModal from '../components/modals/sgbd/addSgbd';
import DetailsSgbdModal from '../components/modals/sgbd/detailsSgbdModal';
import EditSgbdModal from '../components/modals/sgbd/editSgbdModal';


export default function SgbdPage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);

  const { data,isFetching,refetch } = useFetchSgbdsQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"sgbd"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green"><FontAwesomeIcon icon={faDatabase} /> Sgbd</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Nom , version ..." onChange={(e)=>{
              setKeyword(e.target.value);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un sgbd</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>Nom</td>
                <td>Version</td>
                  

                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((sgbd:Sgbd) => {
             

              return (<tr key={sgbd.id}>
                <td>{sgbd.name}</td>
                <td>{sgbd.version}</td>
               
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(sgbd));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton data={3} />)} 
            

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
          
       <AddSgbdModal  refetch={CustomRefetch} />
       <DetailsSgbdModal refetch={CustomRefetch} />  
       <EditSgbdModal refetch={CustomRefetch} /> 

    </div>
    
  )
}
