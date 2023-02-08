import React, { useState } from 'react'
import  Navbar  from '../../components/Navbar'
import Header from '../../components/Header'
import {  useGetProjectQuery, useFetchLinkedDbQuery, useLinkDBMutation } from '../../../features/project/project' 
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faList } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../hooks';
import {  useParams } from 'react-router-dom';
import { useFetchBddsQuery } from '../../../features/bdd/bdd';
import SuccessMessage from '../../components/messages/SuccessMessage';
import ErrorMessage from '../../components/messages/ErrorMessage';



 export default function LinkedDBProjectPage() {

  const [keyword, setKeyword] = React.useState("all");
  const [page,setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [linkDB] = useLinkDBMutation();

  const [search,setSearch] = useState("");
  const {data,isLoading} = useGetProjectQuery(parseInt(id!));
  const {currentData,isSuccess,isFetching,refetch} = useFetchLinkedDbQuery(parseInt(id!));
  const [screen,setScreen] = useState("main");
  const allBDD = useFetchBddsQuery({keyword,page});
  const [searchData,setSearchData]= useState(allBDD.data?.data ?? []);
  function handleSearch(value:string) {
    setSearch(value);
    if(value == ""){
      setSearchData(allBDD.data?.data ?? []);
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
              <label className='d-block'>Selectionner les bases de données de  projet { data?.name } : </label>
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
                    allBDD.data?.data.map((e)=> {
                     
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
                     const payload = await linkDB({id:parseInt(id ?? "0"),db:data}).unwrap();
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

          <h5>Base de données liés aux projet {data?.name} :</h5>
          {
            !isFetching ?
            (
              <ul>
              
             {currentData?.map((e)=>(<li key={e.id}>{e.name}</li>))}

              </ul>
            ):(<></>)
          }
           <Button className="" onClick={()=>{
            handleSearch("");
             setScreen("edit");
            }}>
            <FontAwesomeIcon icon={faEdit} /> Modifier
           </Button>
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
