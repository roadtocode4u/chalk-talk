import React from "react";
import "./Home.css";
import logoimg2 from './img/thinking-2.png';

function Home() {
  return (
    <>
      <div className="background">
        <div className="container">
          <div className="row">
            <h1 className="text-center heading_h1">Chalk-Talk</h1>
            <p className="text-center mt-2 paragraph_text">
              <span className="span_green">A Realtime</span>,{" "}
              <span className="span_blue">Pair Programming</span> platform for
              live code discussion,technical interview with{" "}
              <span className="span_red">Chat feature</span>.{" "}
            </p>
            <div className="col-md-8">
              <div class="card card_shadow w-100 mt-3">
                <div className="card-body">
                  <h3 className="card_title text-center">Join Room</h3>
                  <img src={logoimg2} alt="" className="img-fluid" />
                  <form>
                    <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputFullName"
                        aria-describedby="fullnameHelp"
                        placeholder="Enter Your Full Name"
                      />
                      </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Your Email"
                      />
                      {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                      <input
                        type="phone"
                        className="form-control"
                        id="exampleInputMobile"
                        placeholder="Enter Your Mobile Number"
                      />
                    </div>
                    <button className="join_button w-100">
                      <i className="fa-solid fa-right-to-bracket icons_logos"></i> Join Room
                    </button>
                  </form>
                </div>
              </div>
            </div>

              <div className="col-md-1"></div>

            <div className="col-md-3">
            <div className="form-check mt-5">
  <input className="form-check-input checkbox_input" type="checkbox" value="" id="flexCheckChecked" checked/>
  <label className="form-check-label checkbox_input" for="flexCheckChecked">
    Realtime colaboration
  </label>
</div><br/>

<div className="form-check mt-2">
  <input className="form-check-input checkbox_input" type="checkbox" value="" id="flexCheckChecked" checked/>
  <label className="form-check-label checkbox_input" for="flexCheckChecked">
    Built from scratch
  </label>
</div><br/>

<div className="form-check mt-2">
  <input className="form-check-input checkbox_input" type="checkbox" value="" id="flexCheckChecked" checked/>
  <label className="form-check-label checkbox_input" for="flexCheckChecked">
    Light weighted
  </label>
</div><br/>

<div className="form-check mt-2">
  <input className="form-check-input checkbox_input" type="checkbox" value="" id="flexCheckChecked" checked/>
  <label className="form-check-label checkbox_input" for="flexCheckChecked">
    Chat with peers mentors
  </label>
</div><br/>

<div className="form-check mt-2">
  <input className="form-check-input checkbox_input" type="checkbox" value="" id="flexCheckChecked" checked/>
  <label className="form-check-label checkbox_input" for="flexCheckChecked">
    No time limit
  </label>
</div><br/>

<div className="form-check mt-2">
  <input className="form-check-input checkbox_input" type="checkbox" value="" id="flexCheckChecked" checked/>
  <label className="form-check-label checkbox_input" for="flexCheckChecked">
    No code limit
  </label>
</div><br/>

<div className="form-check mt-2">
  <input className="form-check-input checkbox_input" type="checkbox" value="" id="flexCheckChecked" checked/>
  <label className="form-check-label checkbox_input" for="flexCheckChecked">
    Unlimited room creation
  </label>
</div><br/>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
