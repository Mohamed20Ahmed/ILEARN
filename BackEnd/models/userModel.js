const connection = require("../models/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

class UserModel {
  checkEmailExists(email) {
    const queryString = "SELECT * FROM user WHERE email = ?";
    const result = query(queryString, email);
    return result;
  }
}
userModel = new UserModel();
module.exports = userModel;
