DROP DATABASE IF EXISTS employeesdb;
CREATE database employeesdb;

USE employeesdb;

CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);

CREATE TABLE roles (
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE department (
  
);

SELECT * FROM top5000;
select * from top_albums