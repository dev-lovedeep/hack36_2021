import React, { useRef, useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { getCurrentLocation } from "../config/location";
import { SocketContext } from "../Contexts/SocketContext";
import { UserContext } from "../Contexts/UserContext";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const RouteMap = () => {
    const mapContainerRef = useRef(null);
    const [user, setUser] = useContext(UserContext);
    const [socket, setsocket] = useContext(SocketContext);

    console.log(user.location);

    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [user.location.longitude, user.location.latitude],
        zoom: 16,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      /*Setting up marker*/

      var el = document.createElement('div');
      el.className = 'marker';

      const marker = new mapboxgl.Marker(el).setLngLat([user.location.longitude, user.location.latitude]).addTo(map);

      socket.emit("addUser", user, (error) => {
        if (error) {
          console.log(error);
        }
      });

      setInterval(() => {
        getCurrentLocation((position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            speed: position.coords.speed,
          };

          socket.emit("sendUserLocation", location, ({ambulance, error}) => {
            if(ambulance){
                const {route, duration} = ambulance;

                /* Use duration for displaying format="seconds"*/

                const geojson = {
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

            } else {
                console.log(error);
            }
          });
        });
      }, 5000);
  
      return () => map.remove();
    });
  
    return (
      <div className="map-container container-fluid" ref={mapContainerRef} />
    );
  };
  
  export default RouteMap;
  