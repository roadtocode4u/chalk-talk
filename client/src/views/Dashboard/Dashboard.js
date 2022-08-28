import React, { useEffect, useState } from 'react';
import { useSearchParams }  from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import TADoubtCard from '../../components/TADoubtCard/TADoubtCard';
import './Dashboard.css';
import  ChartDoubts from '../../components/ChartDoubts/ChartDoubts';

function Dashboard() {
  const [doubts, setDoubts] = useState([])
  
  const [statusCount, setStatusCount] = useState({
    pending: 0,
    attended: 0,
    resolved: 0
  })
  
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

  useEffect(()=>{
    let pending = 0;
    let attended = 0;
    let resolved = 0;

    doubts.map((doubt) => {
      if(doubt.status === "pending"){
        pending++;
      }
      else if(doubt.status === "attended"){
        attended++;
      }
      else if(doubt.status === "resolved"){
        resolved++;
      }
    });

    setStatusCount({
      pending,
      attended,
      resolved
    })
  }, [doubts]);

  return (
    <div className='container'>
      <div className='ta-greeting'>
        <h4>Hello, {teachingAssistant.fullName}. There are {doubts.length} doubts in your dashboard...</h4>
      </div>

      <div>
        <ChartDoubts pending={statusCount.pending} 
        attended={statusCount.attended} resolved={statusCount.resolved}/>
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