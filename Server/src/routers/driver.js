var express = require("express");
var { isSignedIn, isDriver, isAdmin } = require("../middleware");
var {
  getDriverOwnDetails,
  getDriverDetails,
  getAllDrivers,
  editDriverDetails,
  deleteDriver,
} = require("../services/driverDetails");
const { body } = require("express-validator");
var { errHandler } = require("./errValidator");
var { driverRegister } = require("../services/userAuth");
var driverRouter = express.Router();

driverRouter.post(
  "/",
  [
    // request body checks
    body(["adhaar", "password", "name", "phone", "dLicId"])
      .notEmpty()
      .withMessage("No fields should be empty!"),
    body("name").isLength({ min: 3 }).withMessage("Name too short!"),
    body("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password should be min 8 characters!!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/
      )
      .withMessage("Password must contain alphabets, numbers & symbols!!"),
  ],
  errHandler,
  isSignedIn,
  isAdmin,
  driverRegister
);
// getting own details driver
driverRouter.get("/me", isSignedIn, isDriver, getDriverOwnDetails);
// editting own details driver
driverRouter.put("/me", isSignedIn, isDriver, editDriverDetails);
// get all drivers
driverRouter.get("/", isSignedIn, isAdmin, getAllDrivers);
// getting driver details
driverRouter.get("/:driverId", isSignedIn, isAdmin, getDriverDetails);
// editting details by admin
driverRouter.put("/:driverId", isSignedIn, isAdmin, editDriverDetails);
// deleting user by admin
driverRouter.delete("/:driverId", isSignedIn, isAdmin, deleteDriver);

module.exports = driverRouter;
