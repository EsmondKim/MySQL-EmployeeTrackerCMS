let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "vegetable",
  database: "employees_db"
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
      switch (answer.whatDo) {
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

  function viewDepartments() {
    connection.query("Select id, dept_name, utilized_budget FROM department", function (err, res) {
      if (err) throw err;
      console.log("ID|____DEPARTMENT NAME____|__UTILIZED BUDGET__|");
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].dept_name + " | " + res[i].utilized_budget + " | ");
      }
    })
  }

  function viewEmployees() {
    let query = "SELECT employee.id, employee.first_name, employee.nickname, employee.last_name, department.dept_name, employee.salary, roles.title, mgr_name ";
    query += "FROM employee "; 
    query += "INNER JOIN department ON employee.emp_dept = department.dept_name ";  
    query += "INNER JOIN roles ON department.id = roles.department_id ";
    query += "LEFT JOIN manager ON employee.manager_id = manager.id ";
    
    connection.query(query, function (err, res) {
      //console.log("ID|__FIRST NAME__|__NICKNAME__|__LAST NAME__|___DEPARTMENT___|_TITLE_|_SALARY_|_MANAGER_|");
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].nickname + " | " + res[i].last_name + " | " + res[i].dept_name + " | " + res[i].salary + " | " + res[i].title + " | " + res[i].mgr_name + " | ");     
      }
    })
  }

  function viewEmpsByDept() {
    console.log("View Emps by Dept.");
  } 

  function viewEmpsByMgr() {
    console.log("view emps by Mgr.");
  }
  
  function addEmployee() {
    console.log("Add employee.");
  }

  function removeEmployee() {
    console.log("Remove employee.");
  }

  function updateEmpRole() {
    console.log("Update emp role.");
  }

  function updateEmpMgr() {
    console.log("UPdate emp manager.")
  }