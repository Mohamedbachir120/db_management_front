import React from 'react'
import  Navbar  from '../components/Navbar'
import Header from '../components/Header'
import { useFetchProjectsQuery,Project } from '../../features/project/project' 
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faList } from '@fortawesome/free-solid-svg-icons';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import { useAppDispatch } from '../hooks';
import {  show, showDetail } from '../../features/project/project-ui';
import AddProjectModal from '../components/modals/project/addProject';
import DetailsProjectModal from '../components/modals/project/detailsProjectModal';
import EditProjectModal from '../components/modals/project/editProjectModal';


export default function ProjectPage() {

  const [keyword, setKeyword] = React.useState("");
  const [page,setPage] = React.useState(1);

  const { data,isFetching,refetch } = useFetchProjectsQuery({keyword,page});
  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"project"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        <h2 className="text-green"><FontAwesomeIcon icon={faList} /> Projet</h2>

          <div className='d-flex flex-row my-3'>
        

          <div className='col-9 me-4 '>
            <Form.Control type="text" placeholder="Nom , description ..." onChange={(e)=>{
              setKeyword(e.target.value);
              
            }} />

          </div>
          <div>
          
            <button className='btn bg-secondaire' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un project</button>

          </div>
          </div>
           
          <table className='table table-striped'>
            <thead >
              <tr className='bg-primaire'>
                <td>Nom</td>
                <td>Description</td>
                  

                <td>Détails</td>          
              </tr>
            </thead>
            
            
             {!isFetching ?
           ( <tbody>
              
            {  data?.data.map((project:Project) => {
             

              return (<tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
               
                <td><Button className='bg-secondaire' onClick={()=>{
                  
                  dispatch(showDetail(project));

                }}>Détails</Button></td>


              </tr>)
              
            }) }
            </tbody> ) : (<TableSkeleton data={3}/>)} 
            

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
          
       <AddProjectModal  refetch={CustomRefetch} />
       <DetailsProjectModal refetch={CustomRefetch} />  
       <EditProjectModal refetch={CustomRefetch} /> 

    </div>
    
  )
}
