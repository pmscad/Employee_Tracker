const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Airbus_97",
  database: "employeeDB"
});

var listDep;
var listRoles;
var listEmp;

connection.connect(function(err) {
  if (err) {
    console.error("error connecting " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadID);

  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    listRoles = res.map(role => ({ name: role.title, value: role.id }));
  });
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    listDep = res.map(dep => ({ name: dep.name, value: dep.id }));
  });

  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    listEmp = res.map(emp => ({
      name: `${emp.first_name}${emp.last_name}`,
      value: emp.id
    }));
  });

  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choice: [
        "Add departments",
        "View departments",
        "Add roles",
        "View roles",
        "Add employees",
        "View employees",
        "Update employee roles",
        "End"
      ]
    })
    .then(function(res) {
      console.log(res);
      switch (res.action) {
        case "Add departments":
          addDep();
          break;

        case "View departments":
          viewDep();
          break;

        case "Add roles":
          addRole();
          break;

        case "view roles":
          viewRole();
          break;

        case "Add employees":
          addEmp();
          break;

        case "View employees":
          viewEmp();
          break;

        case "update employee roles":
          updateEmpRole();
          break;

        case "End":
          end();
          break;
      }
    });
}
