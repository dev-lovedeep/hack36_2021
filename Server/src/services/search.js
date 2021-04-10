var Disease = require("../models/disease");
var User = require("../models/user");

async function serachDisease(search) {
  let pattern = "";
  pattern = pattern + "^" + search.charAt(0);
  if (search.length > 4) pattern = pattern + search.charAt(1) + ".*";
  if (search.length > 6)
    pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*";

  if (search.length > 8)
    pattern = pattern + search.charAt(search.length - 2) + ".*";

  const result = await Disease.find({
    name: {
      $regex: pattern,
      $options: "si",
    },
  }).sort({
    name: 1,
  });

  return result;
}

const searchFromAdhaar = (req, res) => {
  User.findOne({ adhaar: req.query.search }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found!", success: false });
    } else {
      return res.status(200).json({
        ...user,
        salt: undefined,
        encry_password: undefined,
      });
    }
  });
};

module.exports = { serachDisease, searchFromAdhaar };
