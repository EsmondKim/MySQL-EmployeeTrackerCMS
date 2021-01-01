let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "vegetable",
  database: "employeesdb"
});

connection.connect(function(err) {
  if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});

function runSearch() {
  inquirer
  .prompt({
    name: "whatDo",
    type: "list",
    message: "What would you like to do?",
    choices: ["View all departments.", "View all employees.", "View all employees by department.", "View all employees by manager.", "Add employee.", "Remove employee.", "Update employee role.", "Update employee manager."]
  })
  .then(function(answer) {
    console.log(answer);
      switch (answer.action) {
        case "View all departments.":
          viewDepartments();
          break;

        case "View all employees.":
          viewEmployees();
          break;

        case "View all employees by department.":
          viewEmpsByDept();
          break;

        case "View all employees by manager.":
          viewEmpsByMgr();
          break;

        case "Add employee.":
          addEmployee();
          break;

        case "Remove employee.":
          removeEmployee();
          break;

        case "Update employee role.":
          updateEmpRole();
          break;  
        
        case "Update employee manager.":
          updateEmpMgr();
          break;
      }     
    });
  }

