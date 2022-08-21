import React from 'react'
import './../../styles/doubtCard.css'
import "./DoubtCard.css"
import { COURSE_NAME_MAP } from './../../utils/subjects'

function DoubtCard(props) {
  return (
    <div className={`card doubt-card ${props.status}-doubt`}>
      <span className={`doubt-status-badge ${props.status}-bg`}>{props.status}</span>
      <div>
        <h6>{props.title} </h6>
        {props.description}
      </div>
      <p><i className="fa-solid fa-calendar-day"></i> {props.slot}</p>
      <p><i className="fa-solid fa-graduation-cap"></i> {COURSE_NAME_MAP[props.courseName]}</p>
      <p><i className="fa-solid fa-chalkboard-user"></i> Teaching Assistant: <b>{props.taName} ({props.taMobile})</b></p>
    </div>
  )
}

export default DoubtCard