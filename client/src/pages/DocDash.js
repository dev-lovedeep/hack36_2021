import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { getDoctorDetails } from "../apiCalls/auth";
import { Link } from "react-router-dom";

import Base from "./Base";
import ShowDetail from "../components/DoctorDashboard/ShowDetail";

const DocDash = () => {
  const [docDetails, setDocDetails] = useState(null);
  const [patients, setPatients] = useState();
  //the user which is currently under view
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    getDoctorDetails().then((res) => {
      if (res.success) {
        setDocDetails(res.details);
        setPatients(res.details.prevPatients);
      } else {
        alert("some error happened login again");
        localStorage.removeItem("docjwt");
        return <Redirect to="/doclogin" />;
      }
    });
  }, []);

  return (
    <Base>
      {patients !== undefined && patients != 0 ? (
        //if patients exists
        <div
          className="row"
          style={{
            position: "relative",
            height: "88vh",
          }}
        >
          <div
            className="col-sm-3 h-100 bg-warning"
            style={{ overflowY: "scroll" }}
          >
            <h4 className="p-2 m-0 text-center text-capitalize w-100">
              patients
            </h4>
            <div className="row">
              {/* mlooping over all pateints */}
              {patients &&
                patients.map((pt) => {
                  return (
                    <button
                      className="col-12 bg-info px-3 pt-2 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveUserId(pt.id)}
                    >
                      <h5>{pt.name}</h5>
                      <p>{pt.id}</p>
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="col h-100" style={{ overflowY: "scroll" }}>
            {activeUserId && <ShowDetail userId={activeUserId} />}
          </div>
        </div>
      ) : (
        //if no patients exist
        <div className="d-flex justify-content-center align-items-center h-100 text-center">
          <div>
            <p className="display-4">Fresh start</p>
            <p>as you start checking patients they will start to apper here</p>
            <Link to="/doctor" className="btn bg-primary text-white">
              go to search page
            </Link>
          </div>
        </div>
      )}
    </Base>
  );
};

export default DocDash;
