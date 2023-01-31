import React, { useState } from 'react'
import  Navbar  from '../../components/Navbar'
import Header from '../../components/Header'
import {  useGetProjectQuery,  useFetchLinkedResponsablesQuery, useLinkResponsableMutation } from '../../../features/project/project' 
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faList, faAt ,faPerson, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../hooks';
import SuccessMessage from '../../components/messages/SuccessMessage';
import ErrorMessage from '../../components/messages/ErrorMessage';
import { useFetchResponsablesQuery } from '../../../features/responsable/responsable';
import { useParams } from 'react-router-dom';



 export default function LinkedProjectResponsable() {

  const [keyword, setKeyword] = React.useState("all");
  const [page,setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [linkResponsable] = useLinkResponsableMutation();

  const [search,setSearch] = useState("");
  const {data,isLoading} = useGetProjectQuery(parseInt(id!));
  const {currentData,isSuccess,isFetching,refetch} = useFetchLinkedResponsablesQuery(parseInt(id!));
  const [screen,setScreen] = useState("main");
  const allResponsables = useFetchResponsablesQuery({keyword,page});
  const [searchData,setSearchData]= useState(allResponsables.data?.data ?? []);
  function handleSearch(value:string) {
    setSearch(value);
    if(value == ""){
      setSearchData(allResponsables.data?.data ?? []);
    }else{
      const newData = searchData.filter((ele)=> ele.name.includes(value))
     
      setSearchData(newData);
      
    }
  }
 
  return (
    <div className='d-flex flex-row'>
      <div className='col-3'>
      <Navbar active={"project"} />

      </div>
      <div className='col-9 pb-5'>
        <Header />
        <div className="card me-5 p-3 shadow">
        {
          
          !isFetching && !isLoading ?
          screen == "edit"? 
          (<div > 
              <label className='d-block'>Selectionner les responsables de  projet { data?.name } : </label>
              <div className='col-6 my-3'>
              <input type="text" className='form-control ' placeholder='search'  onChange={(e)=>{
                  handleSearch(e.target.value)
              }} />

              </div>
              <div className='col-6' style={{"maxHeight":"15vw","overflowY":"scroll","overflowX":"hidden"}}>

                {
                  searchData.length > 0 ?
                  searchData.map((e)=> {
                    
                    return (
                    <div className='border my-1 p-2' key={e.id}>

                      <input className='mx-2' type="checkbox" id={e.id.toString()}  name={e.name} 
                      defaultChecked={currentData?.map((c)=> c.id).includes(e.id) }/> 
                      <label >{e.name}</label>
                    </div>)}
                    ):
                    allResponsables.data?.data.map((e)=> {
                     
                      return (
                      <div className='border my-1 p-2' key={e.id}>
                        
                        <input className='mx-2' type="checkbox" id={e.id.toString()}  name={e.name}
                       
                        /> 
                        <label >{e.name}</label>
                      </div>)}
                      )
                }
              </div>
                <div className='d-flex flex-row justify-content-end col-6 my-5'>
                <button className='btn btn-secondary mx-2' onClick={()=>{
                  setScreen("main");
                }}>Annuler</button>

                <button className='btn btn-success' onClick={async ()=>{
                   var checked = document.querySelectorAll('input:checked');
                   let data: number[] = [];
                   checked.forEach((e)=>{
                     data.push(parseInt(e.getAttribute("id") ?? "0"));
                   })
               
                   try {
                     const payload = await linkResponsable({id:parseInt(id ?? "0"),responsables:data}).unwrap();
                     setScreen("success");
                     setTimeout(()=>{
                       setScreen("main");

                     },1500);
                     refetch();
                   } catch (error) {
                     setScreen("error");
                    setTimeout(()=>{
                      setScreen("main");
                   },1500);

                     
                   }
               
                   refetch();
                  
                }}>Valider</button>
                </div>


          </div>) :
          screen == "success" ?
           (<SuccessMessage message={'Modifié avec succés'} />): 
          screen == "error"? 
          (<ErrorMessage message={"Server error"} />):
          (
          <div>
        <h2 className="text-green"><FontAwesomeIcon icon={faList} /> Projet : {data?.name}</h2>

          <h5>Responsables de  projet {data?.name} :</h5>
          {
            !isFetching ?
            (
              <div>
              
             {currentData?.map((e)=>(
             <div className='card m-1 col-auto' key={e.id}>
              <div className='d-flex flex-row'>
               <span className='d-inline fw-bold '><FontAwesomeIcon icon={faPerson} /> Name:  </span>
               <span className='ms-2'>{e.name}</span>   

              </div>
              <div className="d-flex flex-row">
                <span className='fw-bold'><FontAwesomeIcon icon={faAt} /> Email:  </span>   
                <span className='ms-2'>{e.email}</span>
              </div>
              <div className='d-flex flex-row'>
                <span className='fw-bold'><FontAwesomeIcon icon={faPhone} /> Phone:  </span>   
                <span className='ms-2 '> {e.phone}</span>
              </div>
            
              </div>))}

              </div>
            ):(<></>)
          }
          <div className="d-flex flex-row justify-content-end my-2">

           <Button className="" onClick={()=>{
            handleSearch("");
             setScreen("edit");
            }}>
            <FontAwesomeIcon icon={faEdit} /> Modifier
           </Button>
          </div>
            </div>
            ): (
              <div className='d-flex flex-row justify-content-center align-'>

              <Spinner animation="border" variant='dark' />
              </div>



            ) 
            }
         
        </div>
        </div>
          
    
        

    </div>
    
  )
}

