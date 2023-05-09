const connection = require("../models/connection");
const util = require("util");

const AdminAuth = async (req, res, next) => {
  const query = util.promisify(connection.query).bind(connection);
  const token = req.headers.token;
  const admin = await query(
    "SELECT * FROM user WHERE token = ? AND type = 'admin'",
    [token]
  );
  if (admin[0]) {
    next();
  } else {
    res.status(403).json("You do not have permission to access this page");
  }
};

module.exports = AdminAuth;
