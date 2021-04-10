import React from "react";
import { Nav, Tab, Row, Col } from "react-bootstrap";
import DiagnosisCard from "./DiagnosisCard";
import RouteMap from "../RouteMap";

export default function DashComp({ user }) {
  console.log(user);
  return (
    <div className="container">
      <div className="row my-4 p-4 rounded">
        <h3 className="text-capitalize col">details of</h3>
        <h1 className="col-12 text-capitalize">{user.name}</h1>
        <p className="col-12 offset-1"></p>
      </div>
      <div className="row">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="mx-auto">
            <Nav variant="pills" className="">
              <Nav.Item>
                <Nav.Link eventKey="first">General Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Prescriptions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Call Ambulance</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <div className="container mt-5">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div
                  style={{ width: "100%" }}
                  className="bg-info p-4 rounded shadow mb-4"
                >
                  <h4>Latest Diagnoses</h4>
                  <hr />
                  <div className="d-flex flex-column flex-md-row">
                    {console.log(user)}
                    {user.diseases !== undefined && user.diseases.length ? (
                      user.diseases.map((dis) => {
                        return (
                          <DiagnosisCard
                            disease={dis.name}
                            severity={dis.severity}
                          />
                        );
                      })
                    ) : (
                      <p className="text-white text-center mx-auto">
                        nothing to worry
                      </p>
                    )}
                  </div>
                </div>
                <div
                  style={{ width: "100%" }}
                  className="bg-warning p-4 shadow rounded mb-4"
                >
                  <h4>General Information</h4>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between">
                      <p className="">Date of birth</p>
                      <p>{user.dob}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="">Sex</p>
                      <p>{user.sex}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="">Blood Group</p>
                      <p>{user.blggrp}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="">Adhaar</p>
                      <p>{user.adhaar}</p>
                    </div>
                  </div>
                </div>
                <div
                  style={{ width: "100%" }}
                  className="bg-light shadow p-4 rounded mb-4"
                >
                  <h4>Contact Information</h4>
                  <hr />
                  <div>
                    <div className="d-flex  justify-content-between">
                      <p className="">Phone</p>
                      <p>{user.phone}</p>
                    </div>
                    <div className="d-flex  justify-content-between">
                      <p className="">Email</p>
                      <p>{user.email}</p>
                    </div>
                    <div className="d-flex  justify-content-between">
                      <p className="">Street</p>
                      <p>{user.addr?.street}</p>
                    </div>
                    <div className="d-flex  justify-content-between">
                      <p className="">City</p>
                      <p>{user.addr?.city}</p>
                    </div>
                    <div className="d-flex  justify-content-between">
                      <p className="">Pincode</p>
                      <p>{user.addr?.pincode}</p>
                    </div>
                    <div className="d-flex  justify-content-between">
                      <p className="">State</p>
                      <p>{user.addr?.state}</p>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div className="container py-5 bg-info ">
                  {/* <!-- For demo purpose --> */}
                  <div className="row text-center  mb-5">
                    {console.log(user.medHist)}
                    {user.medHist !== undefined && user.medHist.length ? (
                      //else show medical history
                      //Timeline start
                      <div className="row">
                        <div className="col-lg-7 mx-auto">
                          <ul className="timeline">
                            {/* looping over all the medical history */}
                            {user.medHist.map((hist) => {
                              return (
                                <li className="timeline-item bg-white rounded ml-3 p-4 shadow">
                                  <div className="timeline-arrow"></div>
                                  <h2 className="h5 mb-0">{hist.date}</h2>
                                  <span className="small text-secondary">
                                    doctor Id:{hist.docId}
                                  </span>
                                  <p className="text-small mt-2 font-weight-light">
                                    {hist.desc}
                                  </p>
                                  {/* TODO:add actual images of prescription */}
                                  <p>prescript img/pdf will show here</p>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      //timeline end
                      // if no medical history
                      <div className="text-white text-center mx-auto w-100">
                        <p className="display-4 text-capitalize">
                          great health
                        </p>
                        <p>
                          whenver a doctor upload a prescription it will apper
                          here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <RouteMap/>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </div>
  );
}
