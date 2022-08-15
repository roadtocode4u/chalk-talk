import React, { useEffect, useState } from "react";
import "./AskDoubt.css"
import ImgDoubtWithMan from "./img/doubt-with-man.png"
import ImgDoubtWithBoy from "./img/doubt-with-boy.png"
import axios from "axios";
import DoubtCard from "../DoubtCard/DoubtCard";


function AskDoubt() {
  const headerImage = Math.floor(Math.random() * 2) ?
    ImgDoubtWithMan : ImgDoubtWithBoy;

  const [doubts, setDoubts] =useState([]);

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
    console.log(newDoubt.title)
    console.log(newDoubt.description)
    console.log(newDoubt.slot)
    console.log(newDoubt.courseName)

    await axios.post("/doubt", newDoubt);

    setDoubts({ title: "", description: "", slot: "", courseName: "" });

    alert('Dobut added successfully!')
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/doubts?email=${user.email}`);
      setDoubts(response.data);
    }
    fetchData();
  }, [user.email]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-center">Ask Dobut 🤔</h1>
            <div class="card shawdow-lg w-100 mt-3">
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
                    <textarea class="form-control" id="doubtDescription" placeholder="Describe your doubt here..." 
                    value={newDoubt.description}
                    onChange={(e) => setNewDoubt({ ...newDoubt, description: e.target.value })}
                    rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <select class="form-select" aria-label="Select Course" 
                    value={newDoubt.courseName}
                    onChange={(e) => setNewDoubt({...newDoubt, courseName: e.target.value })} >
                      <option selected>Select Course</option>
                      <option value="C Programming">C Programming</option>
                      <option value="C++ Programming">C++ Programming</option>
                      <option value="Python Programming">Python Programming</option>
                      <option value="Internship Cohort Program">Internship Cohort Program</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <select class="form-select" aria-label="Select Time Slot" value={newDoubt.slot}
                      onChange={(e) => setNewDoubt({...newDoubt, slot: e.target.value })} >
                      <option selected>Select Time Slot</option>
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
             doubts.map(doubt => {
               return (
                        <DoubtCard 
                         title = {doubt.title}
                         description = {doubt.description}
                         slot = {doubt.slot}
                         courseName = {doubt.courseName}
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