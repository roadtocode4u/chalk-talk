
import React from "react";
import "./../../styles/doubtCard.css";
import "./TADoubtCard.css";
import { COURSE_NAME_MAP } from "./../../utils/subjects";
import axios from "axios";

function TADoubtCard(props) {
  const { doubt } = props;

  async function updateDoubtStatus(status) {
    const response = await axios.post(`/updatedoubt`, {
      doubtId: doubt._id,
      status: status,
    });
    if(response){
        window.location.reload();
    }
  }

  function GetStatusButton(){
    if(doubt.status === "pending"){
      return (
        <button className="btn btn-warning btn-sm" type="button"
                onClick={(e)=>{updateDoubtStatus("attended")}}>
                <i class="fa-solid fa-video"></i> Mark Attended
        </button>
      )
    } 
    else if(doubt.status === "attended"){
      return(
        <button className="btn btn-success btn-sm" type="button"
        onClick={(e)=>{updateDoubtStatus("resolved")}}>
        <i class="fa-solid fa-circle-check"></i> Mark Resolved
        </button>
      )
    }
  }
  return (
    <div className={`card doubt-card ${doubt.status}-doubt`}>
      <h6 className="text-center">{COURSE_NAME_MAP[doubt.courseName]}</h6>
      <span className={`doubt-status-badge ${doubt.status}-bg`}>
        {doubt.status}
      </span>
      <p>
        <h5>{doubt.title}</h5>
        {doubt.description}
      </p>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <i class="fa-solid fa-user-graduate"></i> {doubt.user.fullName}
        </div>
        <div className="col-md-4">
          <i class="fa-solid fa-phone"></i> {doubt.user.mobile}
        </div>
        <div className="col-md-4">
          <i class="fa-solid fa-envelope"></i> {doubt.user.email}
        </div>
      </div>
      {doubt.status !== "resolved" &&  <hr />}
      <div className="d-flex justify-content-around">
        <GetStatusButton />
      </div>
    </div>
  );
}

export default TADoubtCard;