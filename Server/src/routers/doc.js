var express = require("express");
var { isSignedIn, isAdmin, isDoctor, isVerified } = require("../middleware");
var { errHandler } = require("./errValidator");

const { doctorRegister } = require("../services/adminAuth");
const { body } = require("express-validator");
var {
  getDoctorOwnDetails,
  getDoctorDetails,
  getAllDoctors,
  editDoctorDetails,
  deleteDoctor,
  addPatients,
} = require("../services/docDetails");

var docRouter = express.Router();
// getting own details doctor
docRouter.post(
  "/",
  [
    // request body checks
    body(["licId", "password", "name", "phone"])
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
  doctorRegister
);
docRouter.get("/me", isSignedIn, isDoctor, getDoctorOwnDetails);
// editting own details doctor
docRouter.put("/me", isSignedIn, isDoctor, editDoctorDetails);
// get all doctors
docRouter.get("/", isSignedIn, isAdmin, getAllDoctors);
// getting doctors details
docRouter.get("/:doctorId", isSignedIn, isAdmin, getDoctorDetails);
// editting details by admin
docRouter.put("/:doctorId", isSignedIn, isAdmin, editDoctorDetails);
// deleting user by admin
docRouter.delete("/:doctorId", isSignedIn, isAdmin, deleteDoctor);
// adding patients by doctor
docRouter.put("/patients", isSignedIn, isDoctor, addPatients);

module.exports = docRouter;
