const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
      console.table('Departments', res);
      })
    }

  function viewEmployees() {
    let query = "SELECT employee.id, employee.first_name, employee.nickname, employee.last_name, department.dept_name, employee.salary, roles.title, mgr_name ";
    query += "FROM employee "; 
    query += "INNER JOIN department ON employee.emp_dept = department.dept_name ";  
    query += "INNER JOIN roles ON department.id = roles.department_id ";
    query += "LEFT JOIN manager ON employee.manager_id = manager.id ";
    
    connection.query(query, function (err, res) {
        console.table('All Employees', res);
        })
    }
  
  function viewEmpsByDept() {
    let query = "SELECT department.dept_name, employee.id, employee.first_name, employee.nickname, employee.last_name ";
    query += "FROM department ";
    query += "INNER JOIN employee ON employee.emp_dept = department.dept_name ";
    query += "ORDER BY department.dept_name";
    
    connection.query(query, function (err, res) {
      console.table('Employees By Manager', res);
      })
  } 

  function viewEmpsByMgr() {
    console.log("view emps by Mgr.");
    let query = "SELECT manager.id, manager.mgr_name, employee.first_name, employee.nickname, employee.last_name ";
    query += "FROM manager ";
    query += "INNER JOIN employee ON manager.id = employee.manager_id ";
    query += "ORDER BY manager.mgr_name";
    connection.query(query, function (err, res) {
      console.table('Employees By Manager', res);
      })
  }
  
  function addEmployee() {
    inquirer
    .prompt([      
      {
        name: "newEmpFirstName",
        type: "input",
        message: "What is the new employee's first name? (Required.)"
      },
      {
        name: "newEmpNickname",
        type: "input",
        message: "What is the new employee's nickname, if any? (Leave blank if none)"
      },
      {
        name: "newEmpLastName",
        type: "input",
        message: "What is the new employee's last name? (Required.)"
      },
      {
        name: "newEmpDept",
        type: "list",
        message: "What is the new employee's department? (Required)",
        choices: ['Therapy & HR', 'Debt Collection', 'Chiropractic & Firearms', 'Cafeteria and Catering', 'Credit and Lending']
      },
      {
        name: "newEmpSalary",
        type: "input",
        message: "What is the new employee's salary? (Required)"
      },
      {
        name: "newEmpManager",
        type: "list",
        message: "Who will manage this new employee?",
        choices: ["Anthony Soprano", "Christopher Moltisanti", "Furio Giunta", "Nobody/Fuggedaboutit"],
      },
      {
        name: "newEmpRole",
        type: "list",
        message: "What will the new employee's role be? (Required)",
        choices: ['Therapist', 'Collections Agent', 'Negotiator', 'Chef', 'Loan Broker']
      }
    ])

    .then(function(answer) {
      var newEmpsMgr = " "

      if (answer.newEmpManager === "Anthony Soprano") {
        newEmpsMgr = 1;
      }
   
      if (answer.newEmpManager === "Christopher Moltisanti") {
        newEmpsMgr = 3;
      }
      
      if (answer.newEmpManager === "Furio Giunta") {
        newEmpsMgr = 6;
      }
      
      if (answer.newEmpManager === "Nobody/Fuggedaboutit") {
        newEmpsMgr = null;
      }
      
      var newEmpsRole = " ";
      
      if (answer.newEmpRole === 'Therapist') {
        newEmpsRole = 2
      }
      if (answer.newEmpRole === 'Collections Agent') {
        newEmpsRole = 3
      }
      if (answer.newEmpRole === 'Negotiator') {
        newEmpsRole = 4
      }
      if (answer.newEmpRole === 'Chef') {
        newEmpsRole = 5
      }
      if (answer.newEmpRole === 'Loan Broker') {
        newEmpsRole = 6
      }

      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.newEmpFirstName,
          nickname: answer.newEmpNickname,
          last_name: answer.newEmpLastName,
          emp_dept: answer.newEmpDept,
          salary: answer.newEmpSalary,
          roles_id: newEmpsRole,
          manager_id: newEmpsMgr
         },
    
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee added!\n");
          runSearch()
        }
      )
    })
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