
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Number of servers',
    },
  },
};

const Home = () => {



  var [labels,setLabels] = useState([]);  
  var [data,setData] = useState([]);
  useEffect(  () => {
    async function fetchData(){
     await axios.get(baseUrl + "stats").then((response)=>{
        setLabels(response.data.populations.map((e:any)=> e.designation));
        setData(response.data.populations.map((e:any)=> e.projects_count));
  
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
           <Line  options={options} data={ 
            {
              
            labels,
            datasets: [
              {
                fill: true,
                label: 'Windows Server',
                data:  data ,
                borderColor: '#50A060',
                backgroundColor: '#50A0606e',
              },
            ],}} />
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