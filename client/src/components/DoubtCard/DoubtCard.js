import React from 'react'
import "./DoubtCard.css"

function DoubtCard(props) {
  function getTeachingAssistant(){

  }
  return (
    <div className={`card card-recent-doubt ${props.status}-doubt`}>
      <span className={`doubt-card-status-badge ${props.status}-bg`}>{props.status}</span>
      <div>
        <h6>{props.title} </h6>
        {props.description}
      </div>
      <p><i className="fa-solid fa-calendar-day"></i> {props.slot}</p>
      <p><i className="fa-solid fa-graduation-cap"></i> {props.courseName}</p>
      <p><i className="fa-solid fa-chalkboard-user"></i> Teaching Assistant: <b>{props.taName} ({props.taMobile})</b></p>
    </div>
  )
}

export default DoubtCard