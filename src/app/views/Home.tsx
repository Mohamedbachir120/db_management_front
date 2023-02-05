
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

  useEffect(  () => {
    async function fetchData(){
     await axios.get(baseUrl + "stats").then((response)=>{
        setLabelsPopulation(response.data.populations.map((e:any)=> e.designation));
        setDataPopulations(response.data.populations.map((e:any)=> e.projects_count));
        setLabelsBdd(response.data.servers.map((e:any)=> e.dns));
        setDataBDD(response.data.servers.map((e:any)=> e.bdds_count));
  
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
}} data={ 
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
         {/* <div className="col card mx-2">
           <Line  options={options} data={data1} />

        </div>


        </div>
        <div className="d-flex flex-row justify-content-around me-4 my-2">
         <div className="col card mx-2">
         <Doughnut data={dataPie} />
         </div>
         <div className="col card mx-2">

         <Pie data={dataPie} />

        </div> */}


        </div>
      </div>
      
    </div>
  )
}

export default Home