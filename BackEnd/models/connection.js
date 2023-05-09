const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ilearn",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    console.error("Connection Error");
    throw err;
  }
  console.log("Connect to mysql");
});

module.exports = connection;
