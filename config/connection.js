const mysql = require("mysql");
const chalk = require("chalk");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Airbus_97",
  database: "employeeDB"
});

connection.connect(err => {
  if (err) {
    console.log(chalk.white.bgRed(err));
    return;
  }
  console.log(chalk.green(`Connected to db. ThreadID: ${connection.threadId}`));
});

module.exports = connection;
