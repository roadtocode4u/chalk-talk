import React, { useEffect, useState } from 'react';
import { useSearchParams }  from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import TADoubtCard from '../../components/TADoubtCard/TADoubtCard';
import './Dashboard.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['pending', 'attednded', 'resolved'],
  datasets: [
    {
      label: 'Doubt Status',
      data: [12, 19, 3],
      backgroundColor: [
        '#ff704d',
        '#f0ad4e',
        '#339966'
      ],
      borderColor: [
        '#ffffff',
        '#ffffff',
        '#ffffff'
      ],
      borderWidth: 2,
    },
  ],
};

function Dashboard() {
  
  const [doubts, setDoubts] = useState([])
  const [teachingAssistant, setTeachingAssistant] = useState({});
  
  let [searchParams] = useSearchParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(()=>{
    async function fetchData(){
      const response = await axios.get(`/assistants?email=${email}&token=${token}`);
      if(response.data.success){
        setTeachingAssistant(response.data.data);          
      }
      else{
       swal("unauthorized access", "तू Teaching Assistant है क्या बे?", "error");      
      }
    }
    fetchData();
  },[email, token]);

  useEffect(()=>{
    async function fetchData(){
      const response = await axios.get(`/doubtsforta/${teachingAssistant.email}`);
      if(response){
        setDoubts(response.data);
      }
    }
      fetchData();
  },[teachingAssistant]);

    

  return (
    <div className='container'>
      <div className='ta-greeting'>
        <h4>Hello, {teachingAssistant.fullName}. There are {doubts.length} doubts in your dashboard...</h4>
      </div>
      <div>
      <Pie className='chart' data={data} height={300} options={{ maintainAspectRatio: false }}/>
      </div>
      {
        doubts.map((doubt,index)=>{
            return(
              <TADoubtCard doubt={doubt} key={index} />
              )
      })
    }
      </div>
  )
}


export default Dashboard