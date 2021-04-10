var Doctor = require("../models/doctor");

exports.getDoctorOwnDetails = (req, res) => {
  const data = req.root._doc; // extracting data after middleware store
  return res.status(200).json({
    name: data.name,
    licId: data.licId,
    phone: data.phone,
    prevPatients: prevPatients,
  });
};

exports.editDoctorDetails = (req, res) => {
  var drid =
    req.params.doctorId !== undefined ? req.params.doctorId : req.root._doc._id;
  const { name, licId, phone } = req.body;
  Doctor.findById(drid).then((doctor) => {
    if (name !== undefined) doctor.name = name;
    if (licId !== undefined) doctor.licId = licId;
    if (phone !== undefined) doctor.phone = phone;

    doctor
      .save()
      .then((savedDoctor) => {
        return res.status(200).json({ msg: "Doctor Updated!", success: true });
      })
      .catch((err) => {
        return res.status(502).json({ error: err, success: false });
      });
  });
};

exports.getAllDoctors = (req, res) => {
  Doctor.find({}).then((doctors) => {
    return res.status(200).json(doctors.map((d) => d.transform()));
  });
};

// getting doctor details by admin
exports.getDoctorDetails = (req, res) => {
  Doctor.findById(req.params.doctorId)
    .then((doctor) => {
      if (!doctor) {
        return res
          .status(404)
          .json({ error: "Doctor not found!", success: false });
      } else {
        return res.status(200).json({ doctor: doctor, success: true });
      }
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};

exports.deleteDoctor = (req, res) => {
  Doctor.findByIdAndDelete(req.params.doctorId)
    .then((doctor) => {
      if (!doctor) {
        return res
          .status(404)
          .json({ error: "Doctor not found!", success: false });
      } else {
        return res.status(200).json({ msg: "Doctor Deleted", success: true });
      }
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};

exports.addPatients = (req, res) => {
  if (req.body.patient === undefined) {
    return res.status(400).json({ error: "Field is empty!", success: false });
  } else {
    Doctor.findById(req.root._doc._id).then((doctor) => {
      doctor.prevPatients.push(req.body.patient);
      doctor
        .save()
        .then((savedDoctor) => {
          return res.status(200).json({ msg: "Patient added!", success: true });
        })
        .catch((err) => {
          return res.status(502).json({ error: err, success: false });
        });
    });
  }
};
