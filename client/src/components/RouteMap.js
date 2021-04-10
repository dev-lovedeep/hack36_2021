import React, { useRef, useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { getCurrentLocation } from "../config/location";
import { SocketContext } from "../Contexts/SocketContext";
import { UserContext } from "../Contexts/UserContext";
import { API } from "../config/backend";
import socketioclient from "socket.io-client/dist/socket.io";
import axios from 'axios';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const RouteMap = () => {
    const mapContainerRef = useRef(null);
    const [user, setUser] = useContext(UserContext);
    // const [socket, setsocket] = useContext(SocketContext);
    const socket = socketioclient(API);

    console.log(user.location);
    const lng = user.location.longitude;
    const lat = user.location.latitude;

    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [80.9462, 26.8467],
        //center: [lng, lat],
        zoom: 16,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      /*Setting up marker*/

      var el = document.createElement('div');
      el.className = 'marker';

      const marker = new mapboxgl.Marker(el).setLngLat([80.9462, 26.8467]).addTo(map);
      // const marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

      socket.emit("addUser", user, (error) => {
        if (error) {
          console.log(error);
        }
      });

      // setInterval(() => {
        {
        getCurrentLocation((position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            speed: position.coords.speed,
          };

          socket.emit("sendUserLocation", location, ({ambulance, error}) => {
            if(ambulance){
              console.log(location);
              console.log(ambulance);
                getRoute(ambulance.location, [location.longitude, location.latitude]);

                // var {route, duration} = ambulance;
                // console.log(ambulance);
                // console.log(typeof route);
            
                // console.log(route[0]);

                // /* Use duration for displaying format="seconds"*/

                // var geojson = {
                //     type: 'Feature',
                //     properties: {},
                //     geometry: {
                //       type: 'LineString',
                //       coordinates: route
                //     }
                // }

                // console.log(map.getSource('route'));

                // if (map.getSource('route')) {
                //   console.log("happened!");
                //     map.getSource('route').setData(geojson);
                //   } 
                //   else { 
                //     map.addLayer({
                //       id: 'route',
                //       type: 'line',
                //       source: {
                //         type: 'geojson',
                //         data: geojson,
                //       },
                //       layout: {
                //         'line-join': 'round',
                //         'line-cap': 'round'
                //       },
                //       paint: {
                //         'line-color': '#3887be',
                //         'line-width': 5,
                //         'line-opacity': 0.75
                //       }
                //     })
                //   }

            } else {
                console.log(error);
            }
          });
        });
      }
      // }, 5000);

      const getRoute = (end, start) => {

        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`, 
        ).then((res) => {
  
          var data = res.data.routes[0];
          var route = data.geometry.coordinates;
  
          console.log(route);
  
          var geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
          if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
          } 
          else { 
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson,
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            })
          }
  
        }).catch((e) => {
            console.log(e);
          });
      }
  
      return () => map.remove();
    }, []);
  
    return (
      <div>
      <div className="map-container container-fluid" ref={mapContainerRef} />
      {/* <button onClick={}>Get ambulance</button> */}
      </div>
    );
  };
  
  export default RouteMap;
  