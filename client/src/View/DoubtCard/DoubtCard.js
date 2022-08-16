import React from 'react'
import "./DoubtCard.css"

function DoubtCard(props) {
  return (
    <div>
      <div className='container-recent-doubt'>
        <div>
          <b>Title: </b> {props.title} <br />
          <b>Description:</b> {props.description} <br />
          <b>Slot:</b> {props.slot}<br />
          <b>Course Name:</b> {props.courseName}
        </div>
      </div>
    </div>
  )
}

export default DoubtCard