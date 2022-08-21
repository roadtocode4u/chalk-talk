import React, { useEffect, useState } from 'react';
import { useSearchParams }  from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import TADoubtCard from '../../components/TADoubtCard/TADoubtCard';
import './Dashboard.css';

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
      {
        doubts.map((doubt,index)=>{
            return(
              <TADoubtCard doubt={doubt} key={index} />
              )
      }
    </div>
  )
}

export default Dashboard