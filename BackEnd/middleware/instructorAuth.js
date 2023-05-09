const connection = require("../models/connection");
const util = require("util");

const InstructorAuth = async (req, res, next) => {
  const query = util.promisify(connection.query).bind(connection);
  const token = req.headers.token;
  const instructor = await query(
    "SELECT * FROM user WHERE token = ? AND type = 'instructor'",
    [token]
  );
  if (instructor[0]) {
    next();
  } else {
    res.status(403).json("You do not have permission to access this page");
  }
};

module.exports = InstructorAuth;
