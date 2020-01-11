const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
const connection = require("./config/connection");

const startScreen = [
  "View all Employees",
  "View all Employees by Department",
  "View all Departments",
  "View all Roles",
  "Add Employee",
  "Add Department",
  "Add Role",
  "Update Employee Role",
  "Remove Employee",
  "Remove Department",
  "Remove Role",
  "Exit"
];

let listDep;
let listRoles;
let listEmp;

connection.query("SELECT * FROM roles", function(err, res) {
  if (err) throw err;
  listRoles = res.map(role => ({ name: role.title, value: role.id }));
});
connection.query("SELECT * FROM departments", function(err, res) {
  if (err) throw err;
  listDep = res.map(dep => ({ name: dep.name, value: dep.id }));
});

connection.query("SELECT * FROM employees", function(err, res) {
  if (err) throw err;
  listEmp = res.map(emp => ({
    name: `${emp.first_name}${emp.last_name}`,
    value: emp.id
  }));
});

start();

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add departments",
        "View departments",
        "Delete departments",
        "Add roles",
        "View roles",
        "Delete roles",
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

        case "Delete departments":
          delDep();
          break;

        case "Add roles":
          addRole();
          break;

        case "View roles":
          viewRole();
          break;

        case "Delete roles":
          delRole();
          break;

        case "Add employees":
          addEmp();
          break;

        case "View employees":
          viewEmp();
          break;

        case "Delete employee":
          delEmp();
          break;

        case "Update employee roles":
          updateRole();
          break;

        case "End":
          end();
          break;
      }
    });
}
// Add department
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

// View Department
function viewDep() {
  console.log("Departments: \n");
  connection.query("SELECT * FROM department", function(error, res) {
    console.log(res);
    start();
  });
}

// Add Role
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

// View Role
function viewRole() {
  let query = `SELECT title AS "Title" FROM roles`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log(" ");
    console.table(chalk.yellow("All Roles"), results);
    start();
  });
}

// ==============Bonus!!!===============================================

// Delete Department
function delDep() {
  let query = `SELECT * FROM department`;
  connection.query(query, function(err, res) {
    if (err) throw err;
    let deptChoices = res.map(data => ({
      value: data.id,
      name: data.name
    }));

    inquirer
      .prompt([
        {
          name: "dept",
          type: "list",
          message: "Choose department to delete",
          choices: listDep
        }
      ])
      .then(answers => {
        let query = `DELETE FROM department WHERE ?`;
        connection.query(
          query,
          {
            id: answers.dept
          },
          function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
          }
        );
      });
  });
}

// Delete Role

function delRole() {
  let query = `SELECT * FROM role`;
  connection.query(query, (err, results) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "delRole",
          type: "list",
          choices: function() {
            let choiceArray = results.map(choice => choice.title);
            return choiceArray;
          },
          message: "Select a role to delete:"
        }
      ])
      .then(answer => {
        connection.query(`DELETE FROM role WHERE ? `, {
          title: answer.delRole
        });
        start();
      });
  });
}

// Delete Employees

function delEmp() {
  inquirer.prompt([
    {
      name: "employeeDelete",
      type: "input",
      message: " To Delete an Employee, enter the Employee id"
    }
  ]);
}

// ==============Bonus!!!===================================================

// Add Employess

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
// Update employee roles

function updateRole(data) {
  console.log("updating emp");
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update the role of?",
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
      console.table(chalk.yellow("Updated Emπloyee"), res);
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
