var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "spootie1",
    database: "employee_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
          employeeSearch();
          break;
        }
      });
  }

  // Search the employee table 
  function employeeSearch() {
    connection.query("SELECT employee.employee_id, employee.first_name, employee.last_name, department.name, role.title, role.salary FROM ((department INNER JOIN role ON department.department_id=role.department_id) INNER JOIN employee ON role.role_id = employee.role_id)", function(err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        runSearch();
      });
  } 
