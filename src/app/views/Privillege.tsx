import React from 'react'
import  Navbar  from '../components/Navbar'
import Header from '../components/Header'
import { useFetchPrivillegesQuery,Privillege } from '../../features/privillege/privillege' 
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faLock } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import { useAppDispatch } from '../hooks';
import {  show, showDetail } from '../../features/privillege/privillege-ui';

import AddPrivillegeModal from '../components/modals/privillege/addPrivillege';
import DetailsPrivillegeModal from '../components/modals/privillege/detailsPrivillegeModal';
import EditPrivillegeModal from '../components/modals/privillege/editPrivillegeModal';


export default function PrivillegePage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);

  const { data,isFetching,refetch } = useFetchPrivillegesQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"privillege"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green"><FontAwesomeIcon icon={faLock} /> Privillège</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Nom , securable ..." onChange={(e)=>{
              setKeyword(e.target.value);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un privillege</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>Nom</td>
                <td>Securable</td>
                  

                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((privillege:Privillege) => {
             

              return (<tr key={privillege.id}>
                <td>{privillege.name}</td>
                <td>{privillege.securable}</td>
               
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(privillege));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton data={3} />)} 
            

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
          
       <AddPrivillegeModal  refetch={CustomRefetch} />
       <DetailsPrivillegeModal refetch={CustomRefetch} />  
       <EditPrivillegeModal refetch={CustomRefetch} /> 

    </div>
    
  )
}
