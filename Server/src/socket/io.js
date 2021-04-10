var {
  addAmbulance,
  removeAmbulance,
  getAmbulance,
  updateLocation,
  connectedAmbulances,
} = require("./ambulance");

var { addUser, removeUser, updateUserLocation } = require("./users");

const { getDuration, getShortestPathAmbulance } = require("./apiCalls");

exports.socketServer = (io) => {
  console.log("Socket server has started running...");

  /*For Ambulances*/

  io.on("connection", (socket) => {
    console.log(`New Socket Connected : ${socket.id}`);

    socket.on("addAmbulance", (newAmbulance, cb) => {
      const { error, addedAmbulance } = addAmbulance(newAmbulance, socket.id);
      if (error) cb(error);
    });

    socket.on("sendLocation", (location, cb) => {
      updateLocation(socket.id, location);

      console.log(connectedAmbulances);

      socket.broadcast.emit("driversLocation", {
        ambulances: connectedAmbulances,
      });
    });

    /*For Users*/

    socket.on("addUser", (newUser, cb) => {
      console.log(newUser);
      const { error, user } = addUser(socket.id, newUser);
      if (error) cb(error);
    });

    socket.on("sendUserLocation", (location, cb) => {
      updateUserLocation(socket.id, location);
      const { latitude, longitude } = location;
      const nearByAmbulances = [];

      connectedAmbulances.forEach((ambulance) => {
        const res = getDuration(
          [longitude, latitude],
          [ambulance.location.longitude, ambulance.location.latitude]
        );
        
        nearByAmbulances.push(res);
      });

      console.log(nearByAmbulances);

      Promise.all(nearByAmbulances).then((all) => {
        const ambulances = [];
        all.forEach((res) => {
          const data = res.data.routes[0];
          // console.log(data.duration,data.geometry.coordinates)
          // console.log(res);
          ambulances.push({
            location: res.data.waypoints[1].location,
            route: data.geometry.coordinates,
            duration: data.duration
          })
        })

        const { error, ambulance } = getShortestPathAmbulance(ambulances);

        if(error) cb({error});
        else{
          cb({ambulance})
        }

        // console.log(ambulances);
      }).catch((e) => {
        console.log(e);
        cb({error: e});
      })

      const { error, ambulance } = getShortestPathAmbulance(nearByAmbulances);

      // if (error) {
      //   cb({ error });
      // } else {
      //   cb({ ambulance });
      // }
    });

    socket.on("disconnect", () => {
      const removedUser = removeUser(socket.id);
      if (removedUser !== undefined) {
        console.log("Removed user!");
      }

      const removedAmbulance = removeAmbulance(socket.id);
      if (removedAmbulance !== undefined)
        console.log("removed  ambulance." + removedAmbulance.plateNo);
    });
  });
};
