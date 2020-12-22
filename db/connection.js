let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "vegetable",
  database: "employees_seed"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

