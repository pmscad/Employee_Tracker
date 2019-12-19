const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Airbus_97",
  database: "employeeDB"
});

let listDep;
let listRoles;
let listEmp;

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
      choices: [
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

function addDep(data) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department",
        name: "name"
      }
    ])
    .then(function(res) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: res.name
        },
        function(error, res) {
          //   console.log(error);
          if (error) throw error;
        }
      );
    })
    .then(function() {
      console.log(`
      -----Department added!-----`);
    })

    .then(function() {
      start();
    });
}

function viewDep() {
  console.log("Departments: \n");
  connection.query("SELECT * FROM department", function(error, res) {
    console.log(res);
    start();
  });
}

function addRole(data) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of new role?",
        name: "name"
      },
      {
        type: "input",
        message: "What is the salary of new role?",
        name: "salary"
      },
      {
        type: "list",
        message: "In which department is the new role?",
        name: "id",
        choices: listDep
      }
    ])
    .then(function(res) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: res.name,
          salary: res.salary,
          department_id: res.id
        },
        function(error, res) {
          console.log(error);
          if (error) throw error;
        }
      );
    })
    .then(function() {
      console.log(`
        -----Role added!-----
        `);
    })
    .then(function() {
      start();
    });
}

function viewRole() {
  console.log("Roles: \n");
  connection.query("SELECT * FROM role", function(error, res) {
    console.table(res);
    start();
  });
}

function addEmp(data) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is the employee last Name?",
        name: "lastName"
      },
      {
        type: "list",
        message: "What is the employee's title?",
        name: "role",
        choices: listRoles
      }
    ])
    .then(function(res) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.role
        },
        function(error, res) {
          //   console.log(error);
          if (error) throw error;
        }
      );
    })
    .then(function() {
      console.log(`
      -----Employee added!-----`);
    })
    .then(function() {
      start();
    });
}

function viewEmp() {
  console.log("Employees: \n");
  connection.query("SELECT * FROM employee", function(error, res) {
    console.table(res);
    start();
  });
}

function updateEmpRole(data) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update the role off?",
        name: "emp",
        choices: listEmp
      },
      {
        type: "list",
        message: "What is the employee new title?",
        name: "role",
        choices: listRoles
      }
    ])

    .then(function(res) {
      connection.query(
        `UPDATE employee SET role_id = ${res.role} WHERE id = ${res.emp}`,
        function(error, res) {
          // console.log(error);
          if (error) throw error;
        }
      );
    })
    .then(function() {
      console.log(`
        -----Employee Updated!-----
        `);
    })
    .then(function() {
      start();
    });
}

function end() {
  console.log("All done!");
  connection.end();
  process.exit();
}
