INSERT INTO department (id,name)
VALUES (default,'Marketing'),
        (default,'Sales'), 
        (default,'Engineering'),
        (default,'Maintenance');

INSERT INTO role ( title,salary, department)
VALUES ('Marketer', 2000,1),
    ('Salesperson', 3000, 2),
    ( 'Engineer', 4000, 3),
    ('Janitor', 5000, 4);

INSERT INTO employee (first_name, last_name) VALUES
('Leena', 'Cruz');