import React, { useEffect, useState } from 'react';
import { useSearchParams }  from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import TADoubtCard from '../../components/TADoubtCard/TADoubtCard';

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
    <div>
      {
        doubts.map((doubt,index)=>{
            return(
              <TADoubtCard title={doubt.title} key={index} />
            )
        })
      }
    </div>
  )
}

export default Dashboard