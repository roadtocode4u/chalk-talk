import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./AskDoubt.css"
import ImgDoubtWithMan from "./img/doubt-with-man.png"
import ImgDoubtWithBoy from "./img/doubt-with-boy.png"
import DoubtCard from "./../../components/DoubtCard/DoubtCard";
const headerImage = Math.floor(Math.random() * 2) ?
ImgDoubtWithMan : ImgDoubtWithBoy;


function AskDoubt() {
  const [doubts, setDoubts] = useState([]);

  const [newDoubt, setNewDoubt] = useState({
    title: "",
    description: "",
    slot: "",
    courseName: "",
    email: ""
  });

  const [user, setUser] = useState({});
  useEffect(() => {
    const chalkTalkUser = JSON.parse(localStorage.getItem("chalkTalkUser"));
    setUser(chalkTalkUser);
    setNewDoubt({...newDoubt, email: chalkTalkUser.email});
  }, [])

  async function askDobut() {
    const response = await axios.post("/doubt", newDoubt);

    setNewDoubt({ title: "", description: "", slot: "", courseName: "" });
    swal("", response.data.message , response.data.success?  "success" : "warning");
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/doubts?email=${user.email}`);
      if(response.data.length > 0) {
        setDoubts(response.data);
      }
    }
    fetchData();
  }, [user, newDoubt]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-center">Ask Dobut 🤔</h1>
            <div className="card shawdow-lg w-100 mt-3">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="doubtTitle"
                      placeholder="Doubt Topic/Title e.g. Inheritance"
                      value={newDoubt.title}
                      onChange={(e) => setNewDoubt({ ...newDoubt, title: e.target.value })} />
                  </div> 
                  <div className="mb-3">
                    <textarea className="form-control" id="doubtDescription" placeholder="Describe your doubt here..." 
                    value={newDoubt.description}
                    onChange={(e) => setNewDoubt({ ...newDoubt, description: e.target.value })}
                    rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <select className="form-select" aria-label="Select Course" 
                    value={newDoubt.courseName}
                    onChange={(e) => setNewDoubt({...newDoubt, courseName: e.target.value })} >
                      <option value="c">C Programming</option>
                      <option value="cpp">C++ Programming</option>
                      <option value="python">Python Programming</option>
                      <option value="icp">Internship Cohort Program</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <select className="form-select" aria-label="Select Time Slot" value={newDoubt.slot}
                      onChange={(e) => setNewDoubt({...newDoubt, slot: e.target.value })} >
                      <option value="8AM">8AM</option>
                      <option value="10AM">10AM</option>
                      <option value="2PM">2PM</option>
                      <option value="4PM">4PM</option>
                      <option value="8PM">8PM</option>
                    </select>
                  </div>
                  <button className="btn btn-warning w-100" type='button' onClick={askDobut}>
                    <i className="fa-solid fa-right-to-bracket" ></i> Ask Doubt
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <img
              src={headerImage}
              alt=""
              className="img-fluid mx-auto d-block " />
            <h2 className="text-center mt-5"> Your Recent Doubt 👇</h2>

            <div className="row mt-3">
           {
            doubts &&  doubts.map((doubt, i) => {
               return (
                        <DoubtCard 
                         key = {i}
                         title = {doubt.title}
                         description = {doubt.description}
                         slot = {doubt.slot}
                         courseName = {doubt.courseName}
                         status = {doubt.status}
                         taName = {doubt.teachingAssistant[0].fullName}
                         taMobile = {doubt.teachingAssistant[0].mobile}
                        />
               )
             })
            }
         </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AskDoubt