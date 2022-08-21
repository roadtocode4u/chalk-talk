import React from 'react';
import './../../styles/doubtCard.css'
import './TADoubtCard.css';
import { COURSE_NAME_MAP } from './../../utils/subjects'

function TADoubtCard(props) {
  const { doubt } = props;
  return (
    <div className={`card doubt-card ${doubt.status}-doubt`}>
      <h6 className="text-center">{COURSE_NAME_MAP[doubt.courseName]}</h6>
      <span className={`doubt-status-badge ${doubt.status}-bg`}>{doubt.status}</span>
      <p>
        <h5>{doubt.title}</h5>
        {doubt.description}
      </p>
      <hr />
      <div className="row">
        <div className='col-md-4'><i class="fa-solid fa-user-graduate"></i> {doubt.user.fullName}</div>
        <div className='col-md-4'><i class="fa-solid fa-phone"></i> {doubt.user.mobile}</div>
        <div className='col-md-4'><i class="fa-solid fa-envelope"></i> {doubt.user.email}</div>
      </div>
      <hr />
      <div className='d-flex justify-content-around'>
        <button className='btn btn-warning btn-sm'><i class="fa-solid fa-video"></i> Mark Attended</button>
        <button className='btn btn-success btn-sm'><i class="fa-solid fa-circle-check"></i> Mark Resolved</button>
      </div>
    </div>
  )
}

export default TADoubtCard