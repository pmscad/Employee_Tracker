DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;


CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (30),
    PRIMARY KEY
    (id)
    
);

    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
    title VARCHAR
        (30),
    salary DEC
        (10, 4),
    department_id INT,
    Ps
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
            first_name VARCHAR
            (30),
            last_name VARCHAR
            (30),
            role_id INT,
            manager_id INT,
            PRIMARY KEY
            (id)
);
