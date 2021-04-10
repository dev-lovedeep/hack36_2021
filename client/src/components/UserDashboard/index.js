import React, { useContext, useEffect, useState } from "react";
import { API } from "../../config/backend";
import { SocketContext } from "../../Contexts/SocketContext";
import { UserContext } from "../../Contexts/UserContext";
import socketioclient from "socket.io-client/dist/socket.io";
import { useHistory } from "react-router";
import Base from "../../pages/Base";
import DashComp from "./DashComp";

export default function UserDashboard() {
  const [user, setuser] = useContext(UserContext);
  // const [socket, setsocket] = useContext(SocketContext);
  const [ambulances, setambulances] = useState([]);
  const history = useHistory();
  useEffect(() => {
    // const skt = socketioclient(API);
    // setsocket(skt);
    const token = localStorage.getItem("jwt").toString();
    console.log("Bearer" + token);
    // if (!token) {
    //   history.push("/login");
    // }
    fetch(`${API}/user/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          localStorage.removeItem("jwt");
          history.push("/login");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          localStorage.removeItem("jwt");
          history.push("/login");
        }
        setuser({ details: data });
      });
  }, []);
  // useEffect(() => {
  //   if (socket)
  //     socket.on("driversLocation", (res) => {
  //       setambulances(res.ambulances);
  //     });
  // }, [ambulances]);
  return (
    <Base title="User | Dashboard">
      {user.details ? <DashComp user={user.details} /> : <div>Loading...</div>}
    </Base>
  );
}
