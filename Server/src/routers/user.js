// Base URL :- /user/

var express = require("express");
const { isSignedIn, isVerified, isDoctor } = require("../middleware");
var {
  getOwnDetails,
  editOwnDetails,
  getMedicalHistory,
  addMedicalRecord,
  removeMedicalRecord,
  addDisease,
  removeDisease,
} = require("../services/userDetails");
var { searchFromAdhaar } = require("../services/search");
var { historyStore } = require("../config/multerStore");
var { body } = require("express-validator");
const { errHandler } = require("./errValidator");

var userRouter = express.Router();

// get own details
userRouter.get("/me", isSignedIn, isVerified, getOwnDetails);
// edit own details
userRouter.put("/me", isSignedIn, isVerified, editOwnDetails);
// get medical history of a patient
userRouter.get("/medical/:userId", isSignedIn, isDoctor, getMedicalHistory);
// add medical history to patient's profile
userRouter.put(
  "/medical/:userId",
  isSignedIn,
  isDoctor,
  historyStore.single("medical"),
  addMedicalRecord
);
// remove a medical record with pid
userRouter.delete(
  "/medical/:userId",
  isSignedIn,
  isDoctor,
  removeMedicalRecord
);
// adding disease
userRouter.post(
  "/disease/:userId",
  [
    body(["diseaseId", "severity"])
      .notEmpty()
      .withMessage("No field should be empty!"),
  ],
  errHandler,
  isSignedIn,
  isDoctor,
  addDisease
);
// removing disease
userRouter.put(
  "/disease/:userId",
  [body("diseaseId").notEmpty().withMessage("No field should be empty!")],
  isSignedIn,
  isDoctor,
  removeDisease
);

userRouter.get("/s", isSignedIn, isDoctor, searchFromAdhaar);

module.exports = userRouter;
