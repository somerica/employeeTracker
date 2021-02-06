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