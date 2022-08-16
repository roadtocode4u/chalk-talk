import React, {useState, useEffect} from "react";
import "./Home.css";
import ImgBoyTakingNotes from './img/boy-taking-notes.png'
import ImgGirlWithLaptop from './img/girl-with-laptop.png'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Home() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    mobile: ""
  });

  let navigate = useNavigate();
  useEffect(()=>{
    const chalkTalkUser = JSON.parse(localStorage.getItem('chalkTalkUser'));
    if(chalkTalkUser){
      navigate('/askdoubt');
    }
  }, [])

  const headerImage = Math.floor(Math.random() * 2) ?
    ImgBoyTakingNotes : ImgGirlWithLaptop;
  
  const proceed = async() => {
    const response = await axios.post('/user', user);
    if(response){
      localStorage.setItem('chalkTalkUser', JSON.stringify(response.data));
      navigate('/askdoubt');
    }
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="text-center">Chalk-Talk</h1>
          <p className="text-center mt-2 paragraph-text">
            A dedicated platform to solve your doubts and schedule a meeting
            with your teaching assistants.
          </p>
          <div className="col-md-6">
            <div className="card shawdow-lg w-100 mt-3">
              <div className="card-body">
                <img
                  src={headerImage}
                  alt=""
                  className="img-fluid mx-auto d-block header-display-img"
                />
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Full Name"
                      value={user.fullName}
                      onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="phone"
                      className="form-control"
                      id="mobile"
                      placeholder="Mobile Number"
                      value={user.mobile}
                      onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                      required
                    />
                  </div>
                  <button className="btn btn-warning w-100" type="button" onClick={proceed}>
                    <i className="fa-solid fa-right-to-bracket"></i> Proceed
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-evenly">
            <h5>✅Good communications with your teaching assistants</h5>
            <h5>✅Realtime collaboration</h5>
            <h5>✅Motivates to learning , growing and programming</h5>
            <h5>✅Clear your doubts of programming</h5>
            <h5>✅No time limit</h5>

          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
