import React from "react";
import "./Home.css";
import HeadingImgHomepage from "./img/HeadingImgHomepage.png";

function Home() {
  return (
    <>
      <div className="background">
        <div className="container">
          <div className="row">
            <h1 className="text-center">Chalk-Talk</h1>
            <p className="text-center mt-2 paragraph-text">
              A dedicated platform to solve your doubts and schedule a meeting
              with your teaching assistants.
            </p>
            <div className="col-md-8">
              <div class="card shawdow-lg w-100 mt-3">
                <div className="card-body">
                  <img
                    src={HeadingImgHomepage}
                    alt=""
                    className="img-fluid mx-auto d-block header-display-img"
                  />
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
                    </div>
                    <div className="mb-3">
                      <input
                        type="phone"
                        className="form-control"
                        id="exampleInputMobile"
                        placeholder="Enter Your Mobile Number"
                      />
                    </div>
                    <button className="btn btn-warning w-100">
                      <i className="fa-solid fa-right-to-bracket"></i> Proceed
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-1"></div>

            <div className="col-md-3">
              <div className="form-check mt-4">
                <input
                  className="form-check-input checkbox-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label
                  className="form-check-label checkbox-input"
                  for="flexCheckChecked"
                >
                  Good communications with your teaching assistants
                </label>
              </div>
              <br />

              <div className="form-check mt-2">
                <input
                  className="form-check-input checkbox-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label
                  className="form-check-label checkbox-input"
                  for="flexCheckChecked"
                >
                  Realtime colaboration
                </label>
              </div>
              <br />

              <div className="form-check mt-2">
                <input
                  className="form-check-input checkbox-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label
                  className="form-check-label checkbox-input"
                  for="flexCheckChecked"
                >
                  Motivates to learning , growing & programming
                </label>
              </div>
              <br />

              <div className="form-check mt-2">
                <input
                  className="form-check-input checkbox-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label
                  className="form-check-label checkbox-input"
                  for="flexCheckChecked"
                >
                  Clear your doubts of programming
                </label>
              </div>
              <br />

              <div className="form-check mt-2">
                <input
                  className="form-check-input checkbox-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label
                  className="form-check-label checkbox-input"
                  for="flexCheckChecked"
                >
                  No time limit
                </label>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
