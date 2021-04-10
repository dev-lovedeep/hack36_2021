var Disease = require("../models/disease");

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

module.exports = { serachDisease };
