const mysql = require("mysql");
const inquirer = require(inquirer);

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Airbus_97",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting " + err.stack);
  }
});
