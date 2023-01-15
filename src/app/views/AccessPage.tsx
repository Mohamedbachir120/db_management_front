import React from 'react'
import  Navbar  from '../components/Navbar'
import Header from '../components/Header'
import { useFetchAccesssQuery,Access } from '../../features/access/access' 
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faKey } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import { useAppDispatch } from '../hooks';
import {  show, showDetail } from '../../features/access/access-ui';
import AddAccessModal from '../components/modals/access/addAccess';
import DetailsAccessModal from '../components/modals/access/detailsAccess';
import EditAccessModal from '../components/modals/access/editAccess';

export default function AccessPage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);

  const { data,isFetching,refetch } = useFetchAccesssQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"access"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green"><FontAwesomeIcon icon={faKey} /> Accès</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Username , Auth type ..." onChange={(e)=>{
              setKeyword(e.target.value);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un accès</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>Username</td>
                <td>Password</td>
                <td>Auth type</td>
                  

                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((access:Access) => {
             

              return (<tr key={access.id}>
                <td>{access.username}</td>
                <td>{""}</td>
                <td>{access.auth_type == 0 ?"SQl Server authentication":"Windows Authentication"}</td>
               
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(access));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton data={4}/>)} 
            

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
          
       <AddAccessModal  refetch={CustomRefetch} />
         <DetailsAccessModal refetch={CustomRefetch} />  
        <EditAccessModal refetch={CustomRefetch} />

    </div>
    
  )
}
