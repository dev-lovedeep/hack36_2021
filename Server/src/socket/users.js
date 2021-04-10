const users = [];

/**
 * user = {
 *  location: {},
 *  socketId: "",
 *  details: {},
 * }
 */
const addUser = (socketId, newUser) => {
  const existingUser = users.find(
    (user) => user.details._id === newUser.details._id
  );
  if (existingUser) return { error: "Detail Already Taken!!" };

  const addedUser = { ...newUser, socketId: socketId };
  users.push(addedUser);
  return { addUser };
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
