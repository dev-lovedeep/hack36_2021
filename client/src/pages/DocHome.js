import React, { useState } from "react";
import bgImg from "../img/img1.jpg";
import Overlay from "../components/general/Overlay";
import Base from "./Base";
import { Link, Redirect } from "react-router-dom";
import { addPatient, searchUserByAdhaar } from "../apiCalls/auth";

const DocHome = () => {
  const [adhaar, setAdhaar] = useState(null);
  const [loading, setLoading] = useState(false);
  //this will be set by api
  const [patient, setPatient] = useState(null);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //got the patient object
    searchUserByAdhaar(adhaar)
      .then((res) => {
        if (res.success) {
          //add this patient to doctors previous patient list
          //and redirect to doc dashboard page
          addPatient(res.patient)
            .then((res) => {
              console.log("ADD PATIENT", res);
              if (res.success) setSuccess(true);
              else setErr(res.error);
            })
            .catch((err) => console.log(err));
        }
        // setPatient(res.patient);
        else setErr(res.error);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base title="DocHome">
      <div
        style={{ position: "relative", background: "#333", height: "100vh" }}
      >
        <div
          className="row justify-content-center align-items-center bg-info"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            top: "0",
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          {/* if success redirect to dashboard */}
          {success && <Redirect to="/doc/dashboard" />}

          {/* overlay */}
          <Overlay color="#333" opacity="0.4" />

          {/* inside content */}
          <div className="col-sm-8 text-white" style={{ zIndex: "2" }}>
            <h1 className="display-2">We beleive in you!</h1>

            {/* if patient not found or any other error occurs */}
            {err && (
              <div class="alert alert-danger form-control" role="alert">
                {err}
              </div>
            )}

            {/*search by patient id form  */}
            <form
              class="d-flex flex-column flex-md-row"
              onSubmit={handleSubmit}
            >
              <input
                className="form-control me-2 text-capitalize"
                type="search"
                pattern="^[0-9]{12}$"
                placeholder="enter patient's 12 digit aadhar id"
                aria-label="Search"
                value={adhaar}
                minLength="12"
                maxLength="12"
                onChange={(e) => setAdhaar(e.target.value)}
                style={{ height: "60px" }}
                required
              />
              {/* submit btn */}
              <button className="btn btn-success" type="submit">
                {loading ? "checking..." : "view"}
              </button>
            </form>
            <Link to="/doctor/dashboard" className="btn btn-dark mt-4 offset-4">
              go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default DocHome;
