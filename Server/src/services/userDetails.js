var User = require("../models/user");
var Disease = require("../models/disease");

exports.getOwnDetails = (req, res) => {
  // extracting data saved by isVerified middleware
  const data = req.root._doc;
  return res.status(200).json(req.root._doc);
};

exports.editOwnDetails = (req, res) => {
  const { name, email, phone, addr, dob, bloodGrp } = req.body;

  User.findById(req.root._doc._id)
    .then((user) => {
      // if field is not present in request body it is undefined
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      if (phone !== undefined) user.phone = phone;
      if (dob !== undefined) user.dob = dob;
      if (bloodGrp !== undefined) user.bloodGrp = bloodGrp;
      if (addr !== undefined) user.addr = addr;

      user
        .save()
        .then((updatedUser) => {
          return res.status(200).json({ msg: "User Updated!", success: true });
        })
        .catch((err) => {
          return res.status(502).json({ error: err, success: false });
        });
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};
// getting medical history by a doctor
exports.getMedicalHistory = (req, res) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found!", success: false });
    } else {
      return res.status(200).json({ medHist: user.medHist, success: true });
    }
  });
};
// adding new medical record to a patient
exports.addMedicalRecord = (req, res) => {
  if (req.file === undefined) {
    return res
      .status(400)
      .json({ error: "Select a file record to add!", success: false });
  } else {
    User.findById(req.params.userId).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found!", success: false });
      } else {
        var medicalPath = req.file.path;
        var histLen = user.medHist.length;
        var currDate = Date.now();

        // giving an id to each record
        var pid = histLen === 0 ? 1 : user.medHist[histLen - 1].pid + 1;
        user.medHist.push({
          pid: pid,
          date: new Date(currDate),
          medId: medicalPath,
          docId: req.root._doc._id.toString(),
          desc: req.body.desc,
        });

        user
          .save()
          .then((savedUser) => {
            return res
              .status(200)
              .json({ msg: "Record Added!", success: true });
          })
          .catch((err) => {
            return res.status(400).json({ err: err, success: false });
          });
      }
    });
  }
};
// removing a medical record with a pid
exports.removeMedicalRecord = (req, res) => {
  if (req.body.pid === undefined) {
    return res
      .status(400)
      .json({ error: "Fill all the fields!", success: false });
  }
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found!", success: false });
      } else {
        var medRecord = user.medHist.find(
          (record) => record.pid === req.body.pid
        );
        if (medRecord === undefined) {
          return res
            .status(400)
            .json({ error: "Record cannot be found", success: false });
        } else {
          var index = user.medHist.indexOf(medRecord);
          user.medHist.splice(index, 1);
          user
            .save()
            .then((updatedUser) => {
              return res
                .status(200)
                .json({ msg: "Record removed!", success: true });
            })
            .catch((err) => {
              return res.status(400).json({ err: err, success: false });
            });
        }
      }
    })
    .catch((err) => {
      return res.status(400).json({ err: err, success: false });
    });
};

exports.addDisease = (req, res) => {
  if (req.body.severity > 3 || req.body.severity < 1) {
    // check for valid severity index 1-3
    return res.status(400).json({ error: "Invalid severity", success: false });
  } else {
    User.findById(req.params.userId).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found!", success: false });
      } else {
        Disease.findById(req.body.diseaseId).then((disease) => {
          user.diseases.push({
            name: disease.name,
            id: disease._id,
            severity: req.body.severity,
          });
          user
            .save()
            .then((savedUser) => {
              return res
                .status(200)
                .json({ msg: "Disease added!", success: true });
            })
            .catch((err) => {
              return res.status(400).json({ err: err, success: false });
            });
        });
      }
    });
  }
};

exports.removeDisease = (req, res) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found!", success: false });
    } else {
      var diseaseRec = user.diseases.find(
        (disease) => disease.id === req.body.diseaseId
      );
      if (diseaseRec === undefined) {
        return res
          .status(400)
          .json({ error: "Disease cannot be found", success: false });
      } else {
        var index = user.diseases.indexOf(diseaseRec);
        user.diseases.splice(index, 1);
        user
          .save()
          .then((updatedUser) => {
            return res
              .status(200)
              .json({ msg: "Disease removed!", success: true });
          })
          .catch((err) => {
            return res.status(400).json({ err: err, success: false });
          });
      }
    }
  });
};
