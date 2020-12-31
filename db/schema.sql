DROP DATABASE IF EXISTS employeesdb;
CREATE database employeesdb;

USE employeesdb;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    salary DECIMAL,
    FOREIGN KEY (roles_id) REFERENCES roles (id),
    FOREIGN KEY (employee_id) REFERENCES employee (id),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  utilized_budget DECIMAL,
  PRIMARY KEY (id)
);

CREATE TABLE manager (
  id INT NOT NULL AUTO_INCREMENT,
  mgr_name VARCHAR(30),
  PRIMARY KEY (id)
)

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
SELECT * FROM manager;
