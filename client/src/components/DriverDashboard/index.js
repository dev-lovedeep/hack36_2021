import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { API } from "../../config/backend";
import { getCurrentLocation } from "../../config/location";
import { DriverContext } from "../../Contexts/DriverContext";
import { SocketContext } from "../../Contexts/SocketContext";
import socketioclient from "socket.io-client";

export default function DriverDashboard() {
  const [driver, setDriver] = useContext(DriverContext);
  const [socket, setsocket] = useContext(SocketContext);
  const history = useHistory();
  useEffect(() => {
    if (!socket) {
      setsocket(socketioclient(API));
    }
    const token = localStorage.getItem("jwt");
    if (!token) {
      history.push("/driver/login");
    }
    fetch(`${API}/driver/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          localStorage.removeItem("jwt");
          history.push("/driver/login");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          localStorage.removeItem("jwt");
          history.push("/driver/login");
        }
        getCurrentLocation((position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            speed: position.coords.speed,
          };
          setDriver({ details: data, location: location });
          socket?.emit(
            "addAmbulance",
            { details: data, location: location },
            (error) => {
              if (error) {
                console.log(error);
              }
            }
          );
        });
      });

    //   setInterval(() => {
    //   getCurrentLocation((position) => {
    //     const location = {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       accuracy: position.coords.accuracy,
    //       speed: position.coords.speed,
    //     };
    //     socket.emit("sendLocation", location, () => {});
    //   });
    // }, 5000);
  }, [socket]);
  setInterval(() => {
    getCurrentLocation((position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        speed: position.coords.speed,
      };
      socket.emit("sendLocation", location, () => {});
    });
  }, 5000);
  return <div>{driver.details.name}</div>;
}
