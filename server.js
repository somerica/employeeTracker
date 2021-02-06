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
          "Remove an employee",
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

            case "Remove an employee":
                removeEmployee();
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

    // Remove an employee
    function removeEmployee() {
        connection.query("SELECT employee_id, employee.first_name, employee.last_name FROM employee", function(err, results) {
          if (err) throw err;
    
          inquirer.prompt(
            {
              name: "employee",
              type: "rawlist",
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].first_name);
                }
                return choiceArray;
              },
              message: "Which employee would you like to remove?"
            }
          ).then(function(answer) {
            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
              if (results[i].first_name === answer.employee) {
                chosenItem = results[i];
              }
            }
            
            connection.query(
              "DELETE FROM employee WHERE ?",
              {
                employee_id: chosenItem.employee_id
              },
              function(err, res) {
                if (err) throw err;
              }
            );
            runSearch();
          })
        })
        
        
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
