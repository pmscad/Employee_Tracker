# Employee_Tracker

A solution for managing a company's employees using nodejs, and MySQL

The command-line application allows the user to: View departments, roles, employees

      + View departments, roles, employees

      + Add departments, roles, employees

      + Update employee roles

      + Delete departments, roles, and employees

# Screenshots

# Steps to Setup

1. Clone the repo

```bash
git clone git@github.com:pmscad/Employee_Tracker.git
```

2. Install dependencies

```bash
npm install
```

3. Create the database using the schema.sql and seed.sql files.

```
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments(
id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30)
);

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(8,2),
department_id INT,
FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
);


```

```
INSERT INTO departments
    (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);

```

4. Run Server

```bash
node server.js
```

# Links to Project

#### GitHub

The URL of the GitHub repository
https://pmscad.github.io/Employee_Tracker/

# License

MIT.
