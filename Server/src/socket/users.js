const users = [];

/**
 * user = {
 *  location: {},
 *  socketId: "",
 *  details: {},
 * }
 */
const addUser = (socketId, details) => {
  const existingUser = users.find((user) => user.details._id === details._id);

  if (existingUser) return { error: "Detail Already Taken!!" };

  const user = {
    location: {},
    socketId,
    details,
  };
  users.push(user);

  return { user };
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId == socketId);
  if (index !== -1) return users.splice(index, 1)[0];
};

const updateUserLocation = (socketId, location) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (users[index]) {
    user[index].location = location;
  }
};

module.exports = {
  addUser,
  removeUser,
  updateUserLocation,
  users,
};
