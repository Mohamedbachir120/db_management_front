import React from 'react'
import  Navbar  from '../components/Navbar'
import Header from '../components/Header'
import { useFetchPopulationsQuery,Population } from '../../features/population/population' 
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import { useAppDispatch } from '../hooks';
import {  show, showDetail } from '../../features/population/population-ui';
import EditServerModal from '../components/modals/population/editPopulationModal';
import AddPopulationModal from '../components/modals/population/addPopulation';
import DetailsPopulationModal from '../components/modals/population/detailsPopulationModal';
import EditPopulationModal from '../components/modals/population/editPopulationModal';


export default function PopulationPage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);

  const { data,isFetching,refetch } = useFetchPopulationsQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"populations"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green"><FontAwesomeIcon icon={faPeopleGroup} /> Population</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Designation ..." onChange={(e)=>{
              setKeyword(e.target.value);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un population</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>Designation</td>
                  

                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((population:Population) => {
             

              return (<tr key={population.id}>
                <td>{population.designation}</td>
               
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(population));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton data={2} />)} 
            

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
          
       <AddPopulationModal  refetch={CustomRefetch} />
       <DetailsPopulationModal refetch={CustomRefetch} />  
       <EditPopulationModal refetch={CustomRefetch} /> 

    </div>
    
  )
}
