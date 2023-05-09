const connection = require("../models/connection");
const util = require("util");

const StudentAuth = async (req, res, next) => {
  const query = util.promisify(connection.query).bind(connection);
  const token = req.headers.token;
  const student = await query(
    "SELECT * FROM user WHERE token = ? AND type = 'student'",
    [token]
  );
  if (student[0]) {
    next();
  } else {
    res.status(403).json("You do not have permission to access this page");
  }
};

module.exports = StudentAuth;
