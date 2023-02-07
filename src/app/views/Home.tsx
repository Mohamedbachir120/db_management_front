
import "./../../dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { faker } from '@faker-js/faker';
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line , Pie, Doughnut} from 'react-chartjs-2';
import { useFetchStatsQuery } from "../../features/serveur/serveur";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constantes/const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faList12 } from "@fortawesome/free-solid-svg-icons";



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);


const Home = () => {



  var [labels,setLabelsPopulation] = useState([]);  
  var [labelsBDD,setLabelsBdd] = useState([]);
  var [dataPopulations,setDataPopulations] = useState([]);
  var [dataBDD,setDataBDD] = useState([]);
  var [labelsSGBD,setLabelsSGBD] = useState([]);
  var [dataSGBD,setDataSGBD] = useState([]);

  var [bdd_count,setBDDCount] = useState(0);

  useEffect(  () => {
    async function fetchData(){
     await axios.get(baseUrl + "stats").then((response)=>{
        setBDDCount(response.data.count_bdd);
        setLabelsPopulation(response.data.populations.map((e:any)=> e.designation));
        setDataPopulations(response.data.populations.map((e:any)=> e.projects_count));
        setLabelsBdd(response.data.servers.map((e:any)=> e.dns));
        setDataBDD(response.data.servers.map((e:any)=> e.bdds_count));
  
        setLabelsSGBD(response.data.sgbds.map((e:any)=> e.name));
        setDataSGBD(response.data.sgbds.map((e:any)=> e.bdds_count));
  
       })
    }
    fetchData()
  }, []);
  
  return (
    <div className='d-flex flex-row justify-content-start'>
      <div className='col-3'>
        <Navbar active={"home"} />
      </div>
      {
      }
      <div className='col-9'>
        <Header />
        <h2 className="text-green">Dashboard</h2>
        <h5 className="text-dark" id="nb_bdd"><FontAwesomeIcon icon={faDatabase} /> Nombre total :   {bdd_count} BDD</h5>
        <div className="d-flex flex-row justify-content-start">
           <div className="col-7 card mx-2">
           <Line  options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Number of Databases by sgb',
                },
              },
            }}  data={ 
              {

              labels:labelsSGBD ,
            datasets: [
              {
                fill: true,
                label: 'Databases',
                data:  dataSGBD ,
                borderColor: '#50A060',
                backgroundColor: '#50A0606e',
              },
            ],
          }
            
            } />

        </div>
        <div className="col-4 card">
          <h5><FontAwesomeIcon icon={faDatabase} /> Nombre de base de données par sgbd : </h5>
          <ul className="mt-5 list-unstyled">

             {labelsSGBD.map((e,index)=>(<li className="" key={e}>
              <FontAwesomeIcon icon={faList12} /> &nbsp;
              {e +" : "+ dataSGBD[index]}  </li>))}
          </ul>
        </div>


        </div>
        <div className="d-flex flex-row justify-content-around me-4 my-2">
         <div className="col card mx-2">
           <Line  options={{
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Number of projects by population',
    },
  },
}} data={ 
            {
              
           labels:labels,
            datasets: [
              {
                fill: true,
                label: 'Windows Server',
                data:  dataPopulations ,
                borderColor: '#50A060',
                backgroundColor: '#50A0606e',
              },
            ],}} />
         </div>
         <div className="col card mx-2">
           <Line  options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Number of Databases by server',
                },
              },
            }} 
        data={ 
              {

              labels:labelsBDD ,
            datasets: [
              {
                fill: true,
                label: 'Windows Server',
                data:  dataBDD ,
                borderColor: '#50A060',
                backgroundColor: '#50A0606e',
              },
            ],
          }
            
            } />
         </div>
        


        </div>
       
        {/* <div className="d-flex flex-row justify-content-around me-4 my-2">
         <div className="col card mx-2">
         <Doughnut data={dataPie} />
         </div>
         <div className="col card mx-2">

         <Pie data={dataPie} />

        </div>
        </div> */}
      </div>
      
    </div>
  )
}

export default Home