import React from "react";
import { Nav, Tab, Row, Col } from "react-bootstrap";
import DiagnosisCard from "./DiagnosisCard";
export default function DashComp({ user }) {
  console.log(user);
  return (
    <div className="container">
      <div className="row">
        <h1 className="col-12">{user.name}</h1>
        <p className="col-12 offset-1"></p>
      </div>
      <div className="row">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first">General Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Prescriptions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Tests</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Visits</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Call Ambulance</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <div className="container mt-5">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div style={{ width: "100%" }}>
                  <h4>Latest Diagnoses</h4>
                  <hr />
                  <div className="d-flex">
                    <DiagnosisCard
                      disease="Disease 1 long name"
                      date="May 4, 2020"
                    />
                    <DiagnosisCard
                      disease="Disease 1 long name"
                      date="May 4, 2020"
                    />
                    <DiagnosisCard
                      disease="Disease 1 long name"
                      date="May 4, 2020"
                    />
                  </div>
                </div>
                <div style={{ width: "100%" }}>
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
                <div style={{ width: "100%" }}>
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
                      <p>{user.addr?.cityt}</p>
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
              <Tab.Pane eventKey="fifth">
                map and get nearest ambulance on click
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </div>
  );
}
