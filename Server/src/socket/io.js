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
        const { data } = getDuration(
          [longitude, latitude],
          [ambulance.location.longitude, ambulance.location.latitude]
        );
        if (data) {
          nearByAmbulances.push(data);
        }
      });

      const { error, ambulance } = getShortestPathAmbulance(nearByAmbulances);

      if (error) {
        cb({ error });
      } else {
        cb({ ambulance });
      }
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
