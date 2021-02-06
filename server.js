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
          "Add an employee",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
            case "View all employees":
                employeeSearch();
                break;

            case "Add an employee":
                addEmployee();
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
  
  function addEmployee() {
    inquirer.prompt([
      {
      name: "fname",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lname",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: ["Software Engineer", "Sales Manager", "Sales Lead", "Creative Director"]

    }
  ]).then(function(answer) {
    var roleId;

    // Set the role id based off the answer.
    switch(answer.role) {
      case "Software Engineer":
      roleId = 1
      break;

      case "Sales Manager":
      roleId = 2
      break;

      case "Sales Lead":
      roleId = 3
      break;

      case "Creative Director":
      roleId = 4
      break;
    }

    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answer.fname,
        last_name: answer.lname,
        role_id: roleId,
      },
      function(err) {
        if (err) throw err;
        runSearch();
      }
    );
    })}
