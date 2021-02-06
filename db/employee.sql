DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
); 

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (employee_id)
);

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,4),
    department_id INT
);

INSERT INTO department (name)
VALUES('Engineering'), 
('Sales'),
('Legal'),
('Design'),
('Support');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer II', 100000, 1),
('Sales Manager', 70000, 2),
('Sales Lead', 45000, 2),
('Creative Director', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1),
('Betty', 'White', 2),
('Shawn', 'Connery', 3, 1),
('Micheal', 'Jordan', 4);