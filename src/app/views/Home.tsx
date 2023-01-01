
import "./../../dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { faker } from '@faker-js/faker';

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Windows Server',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: '#50A060',
      backgroundColor: '#50A0606e',
    },
  ],
};

export const dataPie = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Home = () => {

   
  return (
    <div className='d-flex flex-row justify-content-start'>
      <div className='col-3'>
        <Navbar active={"home"} />
      </div>

      <div className='col-9'>
        <Header />
        <h2 className="text-green">Dashboard</h2>
        <div className="d-flex flex-row justify-content-around me-4 my-2">
         <div className="col card mx-2">

           <Line  options={options} data={data} />
         </div>
         <div className="col card mx-2">
           <Line  options={options} data={data} />

        </div>


        </div>
        <div className="d-flex flex-row justify-content-around me-4 my-2">
         <div className="col card mx-2">
         <Doughnut data={dataPie} />
         </div>
         <div className="col card mx-2">

         <Pie data={dataPie} />

        </div>


        </div>
      </div>
      
    </div>
  )
}

export default Home